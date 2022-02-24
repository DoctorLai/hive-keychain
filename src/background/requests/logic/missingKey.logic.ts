import { RequestsHandler } from '@background/requests';
import { createPopup } from '@background/requests/dialog-lifecycle';
import sendErrors from '@background/requests/errors';
import { KeychainRequest } from '@interfaces/keychain.interface';

export const missingKey = (
  requestHandler: RequestsHandler,
  tab: number,
  request: KeychainRequest,
  username: string,
  typeWif: string,
) => {
  createPopup(() => {
    sendErrors(
      requestHandler,
      tab!,
      'user_cancel',
      chrome.i18n.getMessage('bgd_auth_canceled'),
      chrome.i18n.getMessage('bgd_auth_no_key', [username, typeWif]),
      request,
    );
  }, requestHandler);
};
