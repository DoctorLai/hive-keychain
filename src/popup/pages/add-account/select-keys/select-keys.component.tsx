import {addAccount} from '@popup/actions/account.actions';
import {setErrorMessage} from '@popup/actions/error-message.actions';
import {RootState} from '@popup/store';
import React, {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import ButtonComponent from 'src/common-ui/button/button.component';
import CheckboxComponent from 'src/common-ui/checkbox/checkbox.component';
import {PageTitleComponent} from 'src/common-ui/page-title/page-title.component';
import {Keys} from 'src/interfaces/keys.interface';
import {Screen} from 'src/reference-data/screen.enum';
import KeysUtils from 'src/utils/keys.utils';
import './select-keys.component.css';

const SelectKeys = ({
  keys,
  username,
  mk,
  addAccount,
  setErrorMessage,
}: PropsFromRedux) => {
  const [importActive, setImportActive] = useState(keys.active ? true : false);
  const [importPosting, setImportPosting] = useState(
    keys.posting ? true : false,
  );
  const [importMemo, setImportMemo] = useState(keys.memo ? true : false);

  const importKeys = (): void => {
    let keysToImport: Keys = {};
    if (importActive) {
      keysToImport.active = keys.active;
      keysToImport.activePubkey = keys.activePubkey;
    }
    if (importPosting) {
      keysToImport.posting = keys.posting;
      keysToImport.postingPubkey = keys.postingPubkey;
    }
    if (importMemo) {
      keysToImport.memo = keys.memo;
      keysToImport.memoPubkey = keys.memoPubkey;
    }

    if (!KeysUtils.hasKeys(keysToImport)) {
      setErrorMessage('popup_accounts_no_key_selected');
    } else {
      addAccount({name: username, keys: keys});
    }
  };

  return (
    <div className="select-keys-page">
      <PageTitleComponent
        title="popup_html_import_keys"
        isBackButtonEnabled={true}
        backScreen={Screen.ACCOUNT_PAGE_ADD_BY_KEYS}
      />
      <div
        className="caption"
        dangerouslySetInnerHTML={{
          __html: chrome.i18n.getMessage('popup_html_import_success'),
        }}></div>

      <CheckboxComponent
        title="popup_html_active"
        info="popup_html_active_info"
        checked={importActive}
        onChange={setImportActive}
      />
      <CheckboxComponent
        title="popup_html_posting"
        info="popup_html_posting_info"
        checked={importPosting}
        onChange={setImportPosting}
      />
      <CheckboxComponent
        title="popup_html_memo"
        info="popup_html_memo_info"
        checked={importMemo}
        onChange={setImportMemo}
      />
      <ButtonComponent label="popup_html_save" onClick={() => importKeys()} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    keys: state.navigation.params.keys,
    username: state.navigation.params.username,
    mk: state.mk,
  };
};

const connector = connect(mapStateToProps, {setErrorMessage, addAccount});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SelectKeysComponent = connector(SelectKeys);
