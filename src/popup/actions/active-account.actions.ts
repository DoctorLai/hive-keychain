import { ActionType } from '@popup/actions/action-type.enum';
import { AppThunk } from '@popup/actions/interfaces';
import { LocalAccount } from 'src/interfaces/local-account.interface';
import HiveUtils from 'src/utils/hive.utils';
import TransactionUtils from 'src/utils/transaction.utils';

export const refreshActiveAccount =
  (initTransactions?: boolean): AppThunk =>
  async (dispatch, getState) => {
    const account = getState().accounts.find(
      (localAccount: LocalAccount) =>
        localAccount.name === getState().activeAccount.name,
    );
    dispatch(loadActiveAccount(account, initTransactions));
  };

export const refreshKeys = (localAccount: LocalAccount) => {
  return {
    type: ActionType.SET_ACTIVE_ACCOUNT,
    payload: {
      keys: localAccount.keys,
    },
  };
};

export const loadActiveAccount =
  (account: LocalAccount, initTransactions?: boolean): AppThunk =>
  async (dispatch, getState) => {
    dispatch(refreshKeys(account));
    dispatch(getAccountRC(account.name));
    if (initTransactions) {
      dispatch(initAccountTransactions(account.name));
    }
    const extendedAccount = (
      await HiveUtils.getClient().database.getAccounts([account.name])
    )[0];
    dispatch({
      type: ActionType.SET_ACTIVE_ACCOUNT,
      payload: {
        account: extendedAccount,
        name: account.name,
      },
    });
  };

export const initAccountTransactions =
  (accountName: string): AppThunk =>
  async (dispatch, getState) => {
    const memoKey = getState().accounts.find(
      (a: LocalAccount) => a.name === accountName,
    )!.keys.memo;
    const transfers = await TransactionUtils.getAccountTransactions(
      accountName,
      null,
      memoKey,
    );

    dispatch({
      type: ActionType.INIT_TRANSACTIONS,
      payload: transfers,
    });
  };

export const getAccountRC =
  (username: string): AppThunk =>
  async (dispatch) => {
    const rc = await HiveUtils.getClient().rc.getRCMana(username);
    dispatch({
      type: ActionType.SET_ACTIVE_ACCOUNT_RC,
      payload: rc,
    });
  };

export const resetActiveAccount = () => {
  return {
    type: ActionType.RESET_ACTIVE_ACCOUNT,
  };
};
