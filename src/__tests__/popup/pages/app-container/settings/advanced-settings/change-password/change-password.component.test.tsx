import App from '@popup/App';
import { Icons } from '@popup/icons.enum';
import { Screen } from '@reference-data/screen.enum';
import '@testing-library/jest-dom';
import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ariaLabelButton from 'src/__tests__/utils-for-testing/aria-labels/aria-label-button';
import ariaLabelInput from 'src/__tests__/utils-for-testing/aria-labels/aria-label-input';
import initialStates from 'src/__tests__/utils-for-testing/data/initial-states';
import mk from 'src/__tests__/utils-for-testing/data/mk';
import reactTestingLibrary from 'src/__tests__/utils-for-testing/react-testing-library-render/react-testing-library-render-functions';
import AccountUtils from 'src/utils/account.utils';
describe('change-password.component tests:\n', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
  });
  beforeEach(async () => {
    await reactTestingLibrary.renderWithConfiguration(
      <App />,
      initialStates.iniStateAs.defaultExistent,
    );
    await act(async () => {
      await userEvent.click(screen.getByLabelText(ariaLabelButton.menu));
      await userEvent.click(
        screen.getByLabelText(ariaLabelButton.menuPreFix + Icons.SETTINGS),
      );
      await userEvent.click(
        screen.getByLabelText(ariaLabelButton.menuPreFix + Icons.PASSWORD),
      );
    });
  });
  it('Must show message and page', () => {
    expect(
      screen.getByLabelText(`${Screen.SETTINGS_CHANGE_PASSWORD}-page`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        chrome.i18n.getMessage('popup_html_change_password_text'),
        { exact: true },
      ),
    ).toBeInTheDocument();
  });

  describe('Click cases:\n', () => {
    it('Must show error when wrong old password after click', async () => {
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          'wrong_old_password',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'new_one1234',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'new_one1234',
        );
        await userEvent.click(screen.getByLabelText(ariaLabelButton.submit));
      });
      expect(
        await screen.findByText(chrome.i18n.getMessage('wrong_password')),
      ).toBeInTheDocument();
    });

    it('Must show error when different new password confirmation after click', async () => {
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          mk.user.one,
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'new_one1234',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'different_confirmation1234',
        );
        await userEvent.click(screen.getByLabelText(ariaLabelButton.submit));
      });
      expect(
        await screen.findByText(
          chrome.i18n.getMessage('popup_password_mismatch'),
        ),
      ).toBeInTheDocument();
    });

    it('Must show error when new password not valid after click', async () => {
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          mk.user.one,
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'notgoodpas',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'notgoodpas',
        );
        await userEvent.click(screen.getByLabelText(ariaLabelButton.submit));
      });
      expect(
        await screen.findByText(chrome.i18n.getMessage('popup_password_regex')),
      ).toBeInTheDocument();
    });

    it('Must set new password, show message and go home page after click', async () => {
      AccountUtils.saveAccounts = jest.fn();
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          mk.user.one,
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'valid16CharactersPLUS',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'valid16CharactersPLUS',
        );
        await userEvent.click(screen.getByLabelText(ariaLabelButton.submit));
      });
      expect(
        await screen.findByText(chrome.i18n.getMessage('popup_master_changed')),
      ).toBeInTheDocument();
      expect(
        await screen.findByLabelText(`${Screen.HOME_PAGE}-page`),
      ).toBeInTheDocument();
    });
  });

  describe('Enter press cases:\n', () => {
    it('Must show error when wrong old password after hitting enter', async () => {
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          'wrong_old_password',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'new_one1234',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'new_one1234{enter}',
        );
      });
      expect(
        await screen.findByText(chrome.i18n.getMessage('wrong_password')),
      ).toBeInTheDocument();
    });

    it('Must show error when different new password confirmation after hitting enter', async () => {
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          mk.user.one,
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'new_one1234',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'different_confirmation1234{enter}',
        );
      });
      expect(
        await screen.findByText(
          chrome.i18n.getMessage('popup_password_mismatch'),
        ),
      ).toBeInTheDocument();
    });

    it('Must show error when new password not valid after hitting enter', async () => {
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          mk.user.one,
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'notgoodpas',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'notgoodpas{enter}',
        );
      });
      expect(
        await screen.findByText(chrome.i18n.getMessage('popup_password_regex')),
      ).toBeInTheDocument();
    });

    it('Must set new password, show message and go home page after hitting enter', async () => {
      AccountUtils.saveAccounts = jest.fn();
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.old),
          mk.user.one,
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.new),
          'valid16CharactersPLUS',
        );
        await userEvent.type(
          screen.getByLabelText(ariaLabelInput.changePassword.confirmation),
          'valid16CharactersPLUS{enter}',
        );
      });
      expect(
        await screen.findByText(chrome.i18n.getMessage('popup_master_changed')),
      ).toBeInTheDocument();
      expect(
        await screen.findByLabelText(`${Screen.HOME_PAGE}-page`),
      ).toBeInTheDocument();
    });
  });
});
