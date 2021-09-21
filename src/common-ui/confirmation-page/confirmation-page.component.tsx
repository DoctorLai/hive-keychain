import { RootState } from '@popup/store';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ButtonComponent from 'src/common-ui/button/button.component';
import { ConfirmationPageFields } from 'src/common-ui/confirmation-page/confirmation-field.interface';
import { PageTitleComponent } from 'src/common-ui/page-title/page-title.component';
import './confirmation-page.component.scss';

const ConfirmationPage = ({
  fields,
  message,
  afterConfirmAction,
  warningMessage,
}: PropsType) => {
  return (
    <div className="confirmation-page">
      <PageTitleComponent
        title={'popup_html_confirm'}
        isBackButtonEnabled={true}></PageTitleComponent>

      <div
        className="introduction"
        dangerouslySetInnerHTML={{
          __html: message,
        }}></div>

      {warningMessage && (
        <div className="warning-message">{warningMessage}</div>
      )}

      {fields.map((field) => (
        <div className="field" key={field.label}>
          <div className="label">{chrome.i18n.getMessage(field.label)}</div>
          <div className="value">{field.value}</div>
        </div>
      ))}

      <ButtonComponent
        label={'popup_html_confirm'}
        onClick={afterConfirmAction}></ButtonComponent>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    message: state.navigation.params.message as string,
    fields: state.navigation.params.fields as ConfirmationPageFields[],
    warningMessage: state.navigation.params.warningMessage as string,
    afterConfirmAction: state.navigation.params.afterConfirmAction,
  };
};

const connector = connect(mapStateToProps, {});
type PropsType = ConnectedProps<typeof connector>;

export const ConfirmationPageComponent = connector(ConfirmationPage);