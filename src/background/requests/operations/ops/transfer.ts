import { ActiveAccountModule } from '@background/active-account.module';
import MkModule from '@background/mk.module';
import { RequestsHandler } from '@background/requests';
import { createMessage } from '@background/requests/operations/operations.utils';
import { encode } from '@hiveio/hive-js/lib/auth/memo';
import {
  KeychainKeyTypesLC,
  RequestId,
  RequestTransfer,
} from '@interfaces/keychain.interface';
import { KeychainError } from 'src/keychain-error';
import AccountUtils from 'src/utils/account.utils';
import TransferUtils from 'src/utils/transfer.utils';

export const broadcastTransfer = async (
  requestHandler: RequestsHandler,
  data: RequestTransfer & RequestId,
) => {
  let result,
    err: any,
    err_message = null;
  try {
    const { username, to } = data;
    const memoKey: string = requestHandler.getUserKey(
      username!,
      KeychainKeyTypesLC.memo,
    )[0];
    let memo = data.memo || '';

    const userAccount = await AccountUtils.getExtendedAccount(data.username!);
    const receiver = await AccountUtils.getExtendedAccount(to);

    if (!receiver) {
      throw new KeychainError('bgd_ops_transfer_get_account', [to]);
    }

    if (data.memo && data.memo.length > 0 && data.memo[0] == '#') {
      if (!memoKey) {
        throw new KeychainError('popup_html_memo_key_missing');
      }
      const memoReceiver = receiver.memo_key;
      memo = encode(memoKey, memoReceiver, memo);
    }

    const localAccounts = await AccountUtils.getAccountsFromLocalStorage(
      await MkModule.getMk(),
    );

    const activeAccount = await ActiveAccountModule.createActiveAccount(
      userAccount,
      localAccounts,
    );

    result = await TransferUtils.sendTransfer(
      data.username!,
      data.to,
      data.amount + ' ' + data.currency,
      memo,
      false,
      0,
      0,
      activeAccount!,
    );
  } catch (e: any) {
    if (typeof e === 'string') {
      const message = createMessage(
        true,
        null,
        data,
        null,
        await chrome.i18n.getMessage('bgd_ops_encode_err'),
      );
      return message;
    } else {
      console.log('in transfer catch', e as KeychainError);
      console.log(e.message, e.trace);
      err = (e as KeychainError).trace || e;
      err_message = await chrome.i18n.getMessage(
        (e as KeychainError).message,
        (e as KeychainError).messageParams,
      );
    }
  } finally {
    const message = createMessage(
      err,
      result,
      data,
      await chrome.i18n.getMessage('bgd_ops_transfer_success', [
        data.amount,
        data.currency,
        data.username!,
        data.to,
      ]),
      err_message,
    );
    return message;
  }
};
