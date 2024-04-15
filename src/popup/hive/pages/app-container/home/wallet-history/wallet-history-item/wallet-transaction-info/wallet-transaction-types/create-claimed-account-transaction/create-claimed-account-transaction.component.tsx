import { CreateClaimedAccount } from '@interfaces/transaction.interface';
import { RootState } from '@popup/multichain/store';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import 'react-tabs/style/react-tabs.scss';
import { GenericTransactionComponent } from 'src/popup/hive/pages/app-container/home/wallet-history/wallet-history-item/wallet-transaction-info/wallet-transaction-types/generic-transaction/generic-transaction.component';

interface CreateClaimedAccountTransactionProps {
  transaction: CreateClaimedAccount;
}

const CreateClaimedAccountTransaction = ({
  transaction,
}: PropsFromRedux & CreateClaimedAccountTransactionProps) => {
  const getDetail = () => {
    return chrome.i18n.getMessage(
      'popup_html_wallet_info_create_claimed_account',
      [transaction.new_account_name],
    );
  };

  return (
    <GenericTransactionComponent
      transaction={transaction}
      detail={getDetail()}></GenericTransactionComponent>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateClaimedAccountTransactionComponent = connector(
  CreateClaimedAccountTransaction,
);
