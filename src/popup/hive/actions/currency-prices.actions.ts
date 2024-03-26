import { AppThunk } from '@popup/multichain/actions/interfaces';
import { ActionType } from 'src/popup/hive/actions/action-type.enum';
import { AppStatus } from 'src/popup/hive/reducers/app-status.reducer';
import CurrencyPricesUtils from 'src/popup/hive/utils/currency-prices.utils';
import Logger from 'src/utils/logger.utils';

export const loadCurrencyPrices = (): AppThunk => async (dispatch) => {
  try {
    const prices = await CurrencyPricesUtils.getPrices();
    dispatch({
      type: ActionType.LOAD_CURRENCY_PRICES,
      payload: prices,
    });
    dispatch({
      type: ActionType.SET_APP_STATUS,
      payload: { priceLoaded: true } as AppStatus,
    });
  } catch (e) {
    Logger.error('currency price error', (e as any).toString());
  }
};
