import userEvent from '@testing-library/user-event';
import React from 'react';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import * as store from '../../../store/store';
import * as userSliceActions from '../../../store/user/actions';
import {render, screen} from '../../../tests/utils';
import {Any} from '../../../types/common';
import UserBlock from './user-block';

const mockLogoutBtn = jest.fn((onClick) => (<button onClick={onClick}>Logout-button</button>));
jest.mock(
  '../logout-btn/logout-btn.tsx',
  () => jest.fn(({onClick}) => mockLogoutBtn(onClick))
);

const mockSetBackUrl = jest.fn();
jest.mock(
  '../../../services/session-storage.ts',
  () => {
    const mockLoginBackUrl = {set: () => mockSetBackUrl()};
    return {loginBackUrl: mockLoginBackUrl};
  }
);

const fakeLogoutAction: Any = 'fake logout action';
jest.spyOn(userSliceActions, 'logout').mockImplementation(() => fakeLogoutAction);

const mockDispatch = jest.fn();
jest.spyOn(store, 'useAppDispatch').mockReturnValue(mockDispatch);

const mockAuthSelector = jest.spyOn(store, 'useAppSelector');

describe('UserBlock component', () => {
  describe('with authorized user', () => {

    beforeEach(() => {
      mockAuthSelector
        .mockReturnValueOnce(AuthorizationStatuses.authorized)
        .mockReturnValueOnce({avatarUrl: 'test-avatar-url'});
    });

    it('renders link to MyList page', () => {
      render(<UserBlock />);

      expect(screen.getByRole('link', {name: 'User avatar'})).toHaveAttribute('href', AppPaths.MY_LIST);
    });
    it('renders user avatar', () => {
      render(<UserBlock />);

      expect(screen.getByRole('img', {name: 'User avatar'})).toHaveAttribute('src', 'test-avatar-url');
    });


    it('renders LogoutBtn child', () => {
      render(<UserBlock />);

      expect(mockLogoutBtn).toBeCalledTimes(1);
    });
    it('handles click on logout-btn correctly', () => {
      render(<UserBlock />);

      userEvent.click(screen.getByRole('button', {name: /logout-button/i}));

      expect(mockDispatch).toBeCalledWith(fakeLogoutAction);
    });
  });

  describe('when user is not athorized', () => {

    beforeEach(() => {
      mockAuthSelector
        .mockReturnValueOnce(AuthorizationStatuses.notAuthorized)
        .mockReturnValueOnce(null);
    });

    it('renders correct link to Login page', () => {
      render(<UserBlock />);

      expect(screen.getByRole('link', {name: /Sign in/i})).toHaveAttribute('href', AppPaths.LOGIN);
    });

    it('calls url-storage servise before navigating to Login page', () => {
      render(<UserBlock />);

      const link = screen.getByRole('link', {name: /Sign in/i});

      userEvent.click(link);

      expect(mockSetBackUrl).toBeCalledTimes(1);
    });
  });
});
