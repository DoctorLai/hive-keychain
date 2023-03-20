import { LocalAccountListItem } from '@interfaces/list-item.interface';
import { LocalAccount } from '@interfaces/local-account.interface';
import { loadActiveAccount } from '@popup/actions/active-account.actions';
import { setTitleContainerProperties } from '@popup/actions/title-container.actions';
import { FavoriteAccountsListComponent } from '@popup/pages/app-container/settings/user-preferences/favorite-accounts/favorite-accounts-list/favorite-accounts-list.component';
import { RootState } from '@popup/store';
import React, { useEffect, useState } from 'react';
import Select, {
  SelectItemRenderer,
  SelectRenderer,
} from 'react-dropdown-select';
import { connect, ConnectedProps } from 'react-redux';
import {
  FavoriteAccounts,
  FavoriteUserList,
  FavoriteUserListName,
  FavoriteUserUtils,
} from 'src/utils/favorite-user.utils';
import './favorite-accounts.component.scss';
//TODO customise & finish
const FavoriteAccounts = ({
  accounts,
  activeAccount,
  localAccounts,
  loadActiveAccount,
  setTitleContainerProperties,
}: PropsFromRedux) => {
  const defaultOptions: LocalAccountListItem[] = [];
  const [options, setOptions] = useState(defaultOptions);
  //   const [claimRewards, setClaimRewards] = useState(false);
  //   const [claimAccounts, setClaimAccounts] = useState(false);
  //   const [claimSavings, setClaimSavings] = useState(false);
  const [selectedLocalAccount, setSelectedLocalAccount] = useState(
    accounts[0].name,
  );
  //   const claimSavingsErrorMessage =
  //     AutomatedTasksUtils.canClaimSavingsErrorMessage(activeAccount);
  //   const claimAccountErrorMessage =
  //     AutomatedTasksUtils.canClaimAccountErrorMessage(activeAccount);
  //   const claimRewardsErrorMessage =
  //     AutomatedTasksUtils.canClaimRewardsErrorMessage(activeAccount);
  const [favoriteAccountsList, setFavoriteAccountsList] = useState<
    FavoriteUserList[]
  >([
    { name: FavoriteUserListName.USERS, list: [] },
    { name: FavoriteUserListName.LOCAL_ACCOUNTS, list: [] },
    { name: FavoriteUserListName.EXCHANGES, list: [] },
  ]);

  useEffect(() => {
    setTitleContainerProperties({
      title: 'popup_html_favorite_accounts',
      isBackButtonEnabled: true,
    });
  }, []);

  useEffect(() => {
    init();
    setOptions(
      accounts.map((account: LocalAccount) => {
        return { label: account.name, value: account.name };
      }),
    );

    setSelectedLocalAccount(activeAccount.name!);
  }, [accounts, activeAccount]);

  //   const saveClaims = async (
  //     claimRewards: boolean,
  //     claimAccounts: boolean,
  //     claimSavings: boolean,
  //   ) => {
  //     setClaimAccounts(claimAccounts);
  //     setClaimRewards(claimRewards);
  //     setClaimSavings(claimSavings);

  //     await AutomatedTasksUtils.saveClaims(
  //       claimRewards,
  //       claimAccounts,
  //       claimSavings,
  //       activeAccount.name!,
  //     );
  //   };

  const init = async () => {
    //TODO remove unused
    // const values = await AutomatedTasksUtils.getClaims(activeAccount.name!);
    // setClaimRewards(values[LocalStorageKeyEnum.CLAIM_REWARDS] ?? false);
    // setClaimAccounts(values[LocalStorageKeyEnum.CLAIM_ACCOUNTS] ?? false);
    // setClaimSavings(values[LocalStorageKeyEnum.CLAIM_SAVINGS] ?? false);

    //load actual favorites
    setFavoriteAccountsList(
      await FavoriteUserUtils.getFavoriteListOldFormatAndReformat(
        activeAccount.name!,
        localAccounts,
        {
          addExchanges: true,
          addSwaps: true,
        },
      ),
    );
  };

  //TODO remove after finished
  useEffect(() => {
    console.log({ favoriteAccountsList }); //TODO to remove
  }, [favoriteAccountsList]);
  //end to remove

  const handleItemClicked = (accountName: string) => {
    const itemClicked = accounts.find(
      (account: LocalAccount) => account.name === accountName,
    );
    loadActiveAccount(itemClicked!);
  };

  const customLabelRender = (
    selectProps: SelectRenderer<LocalAccountListItem>,
  ) => {
    return (
      <div
        className="selected-account-panel"
        onClick={() => {
          selectProps.methods.dropDown('close');
        }}>
        <img
          src={`https://images.hive.blog/u/${selectedLocalAccount}/avatar`}
          onError={(e: any) => {
            e.target.onError = null;
            e.target.src = '/assets/images/accounts.png';
          }}
        />
        <div className="selected-account-name">{selectedLocalAccount}</div>
      </div>
    );
  };
  const customItemRender = (
    selectProps: SelectItemRenderer<LocalAccountListItem>,
  ) => {
    return (
      <div
        aria-label={`select-account-item-${selectProps.item.label}`}
        className={`select-account-item ${
          selectedLocalAccount === selectProps.item.value ? 'selected' : ''
        }`}
        onClick={() => {
          handleItemClicked(selectProps.item.value);
          selectProps.methods.dropDown('close');
        }}>
        <img
          src={`https://images.hive.blog/u/${selectProps.item.label}/avatar`}
          onError={(e: any) => {
            e.target.onError = null;
            e.target.src = '/assets/images/accounts.png';
          }}
        />
        <div className="account-name">{selectProps.item.label}</div>
      </div>
    );
  };

  const handleDeleteFavorite = (
    listName: FavoriteUserListName,
    favoriteItem: FavoriteAccounts,
  ) => {
    const favoriteAccountsListCopy = [...favoriteAccountsList];
    const selectedList = favoriteAccountsListCopy.filter(
      (favoriteList) => favoriteList.name === listName,
    )[0];
    const filteredSelectedList = selectedList.list.filter(
      (favorite) => favorite !== favoriteItem,
    );
    selectedList.list = filteredSelectedList;
    setFavoriteAccountsList([...favoriteAccountsListCopy, { ...selectedList }]);
    //TODO save to local storage with new format.
    //TODO keep working on the src\background\local-storage.module.ts
    // as you will need this to move on in favorites...
  };

  const handleEditFavoriteLabel = (
    listName: FavoriteUserListName,
    favoriteItem: FavoriteAccounts,
    newLabel: string,
  ) => {
    const favoriteAccountsListCopy = [...favoriteAccountsList];
    const selectedList = favoriteAccountsListCopy.filter(
      (favoriteList) => favoriteList.name === listName,
    )[0];
    const favoriteItemIndexToEdit = selectedList.list.findIndex(
      (favorite) => favorite === favoriteItem,
    );
    selectedList.list[favoriteItemIndexToEdit] = {
      ...selectedList.list[favoriteItemIndexToEdit],
      label: newLabel,
    };
    setFavoriteAccountsList([...favoriteAccountsListCopy, { ...selectedList }]);
    //TODO save to local storage with new format.
  };

  //TODO here check why the list have some margins on it sides and remove them.

  return (
    <div aria-label="favorite-accounts-page" className="favorite-accounts-page">
      <div className="intro">
        {chrome.i18n.getMessage('popup_html_favorite_accounts_intro')}
      </div>
      <div className="select">
        <Select
          values={[selectedLocalAccount as any]}
          options={options}
          onChange={() => undefined}
          contentRenderer={customLabelRender}
          itemRenderer={customItemRender}
          className="select-account-select"
        />
      </div>
      <div className="favorite-accounts-list">
        <FavoriteAccountsListComponent
          favoriteList={
            favoriteAccountsList.filter(
              (favoriteList) =>
                favoriteList.name === FavoriteUserListName.USERS,
            )[0]
          }
          handleDeleteFavorite={handleDeleteFavorite}
          handleEditFavoriteLabel={handleEditFavoriteLabel}
        />
        <FavoriteAccountsListComponent
          favoriteList={
            favoriteAccountsList.filter(
              (favoriteList) =>
                favoriteList.name === FavoriteUserListName.LOCAL_ACCOUNTS,
            )[0]
          }
          handleDeleteFavorite={handleDeleteFavorite}
          handleEditFavoriteLabel={handleEditFavoriteLabel}
        />
        <FavoriteAccountsListComponent
          favoriteList={
            favoriteAccountsList.filter(
              (favoriteList) =>
                favoriteList.name === FavoriteUserListName.EXCHANGES,
            )[0]
          }
          handleDeleteFavorite={handleDeleteFavorite}
          handleEditFavoriteLabel={handleEditFavoriteLabel}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accounts: state.accounts,
    activeAccount: state.activeAccount,
    localAccounts: state.accounts,
  };
};

const connector = connect(mapStateToProps, {
  loadActiveAccount,
  setTitleContainerProperties,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const FavoriteAccountsComponent = connector(FavoriteAccounts);
