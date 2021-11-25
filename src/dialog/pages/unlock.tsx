import { KeychainRequest } from '@interfaces/keychain.interface';
import { BackgroundCommand } from '@reference-data/background-message-key.enum';
import { DialogCommand } from '@reference-data/dialog-message-key.enum';
import React, { useState } from 'react';
import ButtonComponent from 'src/common-ui/button/button.component';
import { InputType } from 'src/common-ui/input/input-type.enum';
import InputComponent from 'src/common-ui/input/input.component';
import DialogHeader from 'src/dialog/components/dialog-header/dialog-header.component';
import './unlock.scss';

type Props = {
  data: UnlockMessage;
  wrongMk: boolean;
};

type UnlockMessage = {
  command: DialogCommand;
  msg: {
    success: false;
    error: 'locked';
    result: null;
    data: KeychainRequest;
    message: string;
    display_msg: string;
  };
  tab: number;
  domain: string;
};
export default ({ data, wrongMk }: Props) => {
  console.log(data);
  const [password, setPassword] = useState('');
  const login = () => {
    chrome.runtime.sendMessage({
      command: BackgroundCommand.UNLOCK_FROM_DIALOG,
      value: {
        data: data.msg.data,
        tab: data.tab,
        mk: password,
        domain: data.domain,
        request_id: data.msg.data.request_id,
      },
    });
  };
  return (
    <>
      <DialogHeader title={chrome.i18n.getMessage('dialog_header_unlock')} />
      <p>{chrome.i18n.getMessage('bgd_auth_locked_desc')}</p>
      <InputComponent
        value={password}
        onChange={setPassword}
        logo="lock"
        placeholder="popup_html_password"
        type={InputType.PASSWORD}
        onEnterPress={login}
      />
      <p>{wrongMk && chrome.i18n.getMessage('dialog_header_wrong_pwd')}</p>
      <ButtonComponent label={'dialog_unlock'} onClick={login} />
      <ButtonComponent
        label={'dialog_cancel'}
        onClick={() => {
          window.close();
        }}
      />
    </>
  );
};