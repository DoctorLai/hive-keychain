import { ActionPayload } from '@popup/multichain/actions/interfaces';
import { ErrorMessage } from 'src/interfaces/errorMessage.interface';
import { ActionType } from 'src/popup/hive/actions/action-type.enum';
import { MessageType } from 'src/reference-data/message-type.enum';

export const MessageReducer = (
  state = { key: '', type: MessageType.SUCCESS },
  { type, payload }: ActionPayload<ErrorMessage>,
): ErrorMessage => {
  switch (type) {
    case ActionType.SET_MESSAGE:
      return payload!;
    default:
      return state;
  }
};
