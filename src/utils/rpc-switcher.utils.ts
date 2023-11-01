import { Rpc } from '@interfaces/rpc.interface';
import { setActiveRpc } from '@popup/actions/active-rpc.actions';
import {
  setDisplayChangeRpcPopup,
  setSwitchToRpc,
} from '@popup/actions/rpc-switcher';
import { store } from '@popup/store';
import { LocalStorageKeyEnum } from '@reference-data/local-storage-key.enum';
import LocalStorageUtils from 'src/utils/localStorage.utils';
import RpcUtils from 'src/utils/rpc.utils';

export const useWorkingRPC = async (activeRpc?: Rpc) => {
  const switchAuto = await LocalStorageUtils.getValueFromLocalStorage(
    LocalStorageKeyEnum.SWITCH_RPC_AUTO,
  );
  const currentRpc = activeRpc || (await store.getState().activeRpc);
  for (const rpc of RpcUtils.getFullList().filter(
    (rpc) => rpc.uri !== currentRpc?.uri && !rpc.testnet,
  )) {
    if (await RpcUtils.checkRpcStatus(rpc.uri)) {
      if (switchAuto) {
        store.dispatch(setActiveRpc(rpc));
      } else {
        store.dispatch(setSwitchToRpc(rpc));
        store.dispatch(setDisplayChangeRpcPopup(true));
      }
      return;
    }
  }
};
