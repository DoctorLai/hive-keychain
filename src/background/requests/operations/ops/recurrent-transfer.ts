import { RequestsHandler } from '@background/requests';
import {
  beautifyErrorMessage,
  createMessage,
} from '@background/requests/operations/operations.utils';
import { PrivateKey, RecurrentTransferOperation } from '@hiveio/dhive';
import {
  KeychainKeyTypesLC,
  RequestId,
  RequestRecurrentTransfer,
} from '@interfaces/keychain.interface';
import CurrencyUtils from 'src/utils/currency.utils';
import Logger from 'src/utils/logger.utils';

export const recurrentTransfer = async (
  requestHandler: RequestsHandler,
  data: RequestRecurrentTransfer & RequestId,
) => {
  const { username, to, amount, recurrence, executions, memo } = data;
  let currency = CurrencyUtils.getCurrencyLabel(
    data.currency,
    requestHandler.data.rpc?.testnet || false,
  );
  const client = requestHandler.getHiveClient();
  let result, err;

  try {
    let key = requestHandler.data.key;
    if (!key) {
      [key] = requestHandler.getUserKey(
        data.username!,
        KeychainKeyTypesLC.active,
      ) as [string, string];
    }
    result = await client.broadcast.sendOperations(
      [
        [
          'recurrent_transfer',
          {
            from: username,
            to,
            amount: `${amount} ${currency}`,
            memo: memo || '',
            recurrence,
            executions,
            extensions: [],
          },
        ] as RecurrentTransferOperation,
      ],
      PrivateKey.from(key!),
    );
  } catch (e) {
    Logger.error(e);
    err = e;
  } finally {
    const err_message = beautifyErrorMessage(err);
    const message = createMessage(
      err,
      result,
      data,
      parseFloat(amount) === 0
        ? chrome.i18n.getMessage('bgd_ops_stop_recurrent_transfer')
        : chrome.i18n.getMessage('bgd_ops_recurrent_transfer'),
      err_message,
    );
    return message;
  }
};
