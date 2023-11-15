import React from 'react';
import ButtonComponent from 'src/common-ui/button/button.component';
import DialogHeader from 'src/dialog/components/dialog-header/dialog-header.component';

type Props = {
  data: ResultMessage;
};

type ResultMessage = {
  msg: { message: string; success: boolean };
};

const RequestResponse = ({ data }: Props) => {
  if (data.msg.success) {
    setTimeout(() => {
      // window.close();
    }, 3000);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <DialogHeader
        title={
          data.msg.success
            ? `${chrome.i18n.getMessage('dialog_header_success')} !`
            : `${chrome.i18n.getMessage('dialog_header_error')} !`
        }
      />
      {data.msg.message.split(/<br\s?\/?>/g).map((msg) => (
        <div className="caption" style={{ wordBreak: 'break-word' }}>
          {msg}
        </div>
      ))}
      <div className="fill-space" />
      <ButtonComponent
        label={'dialog_ok'}
        onClick={() => {
          window.close();
        }}
      />
    </div>
  );
};

export default RequestResponse;
