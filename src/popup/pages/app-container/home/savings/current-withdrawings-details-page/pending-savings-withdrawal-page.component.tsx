import { SavingsWithdrawal } from '@interfaces/savings.interface';
import { setTitleContainerProperties } from '@popup/actions/title-container.actions';
import { PendingSavingsWithdrawalItemComponent } from '@popup/pages/app-container/home/savings/current-withdrawings-details-page/pending-savings-withdrawal-item/pending-savings-withdrawal-item.component';
import { RootState } from '@popup/store';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
//TODO update as new sccs.
import './current-withdrawings-details-page.component.scss';

interface PendingSavingsWithdrawalProps {
  currentWithdrawLabel?: string;
}

const PendingSavingsWithdrawal = ({
  currentWithdrawingList,
  currency,
  currentWithdrawLabel,
  setTitleContainerProperties,
}: PropsFromRedux & PendingSavingsWithdrawalProps) => {
  useEffect(() => {
    setTitleContainerProperties({
      title: 'popup_html_savings_current_withdrawing',
      isBackButtonEnabled: true,
    });
  });

  return (
    <div
      className="incoming-outgoing-page"
      aria-label="current-witdraw-savings-page">
      <div className="pending-disclaimer">
        {chrome.i18n.getMessage('popup_html_withdraw_savings_until_message', [
          currency,
        ])}
      </div>
      <div className="list-panel">
        <div className="list">
          {currentWithdrawingList.map((currentWithdrawItem) => {
            return (
              <PendingSavingsWithdrawalItemComponent
                key={currentWithdrawItem.request_id}
                item={currentWithdrawItem}
                currency={currency}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    currentWithdrawingList: state.navigation.stack[0].params
      .currentWithdrawingList as SavingsWithdrawal[],
    currency: state.navigation.stack[0].params.currency as string,
  };
};

const connector = connect(mapStateToProps, {
  setTitleContainerProperties,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const PendingSavingsWithdrawalPageComponent = connector(
  PendingSavingsWithdrawal,
);
