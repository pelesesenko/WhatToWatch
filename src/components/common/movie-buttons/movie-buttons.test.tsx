import React from 'react';
import {render, screen} from '../../../tests/utils';
import * as store from '../../../store/store';
import * as favSlice from '../../../store/fav-films/actions';
import history from '../../../browser-history';
import MovieButtons from './movie-buttons';
import userEvent from '@testing-library/user-event';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import {addIdParam} from '../../../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const stubId = 1;

beforeEach(() => {
  jest.spyOn(store, `useAppSelector`).mockReturnValue(AuthorizationStatuses.authorized);
});

describe(`MovieButtons component`, () => {
  describe(`Should render correctly`, () => {
    it(`Play button should be rendered`, () => {
      render(<MovieButtons id={stubId} favStatus />);

      expect(screen.getByRole(`button`, {name: /Play/i})).toBeInTheDocument();
    });

    it(`MyList button should be rendered`, () => {
      render(<MovieButtons id={stubId} favStatus />);

      expect(screen.getByRole(`button`, {name: /My list/i})).toBeInTheDocument();
    });

    it(`Add review link should be rendered when flag sent`, () => {
      render(<MovieButtons id={stubId} favStatus withAddReview />);

      expect(screen.getByRole(`link`, {name: /Add Review/i})).toBeInTheDocument();
    });

    it(`Add review link should not be rendered without flag`, () => {
      render(<MovieButtons id={stubId} favStatus />);

      expect(screen.queryByRole(`link`, {name: /Add Review/i})).toBe(null);
    });

  });

  describe(`Should handle clicks correctly`, () => {

    const mockDispatch = jest.fn();
    jest.spyOn(store, `useAppDispatch`).mockReturnValue(mockDispatch);

    const mockPostFavStatus = jest.spyOn(favSlice, `postFavStatus`);
    mockPostFavStatus.mockImplementation((data: Any) => data);

    const mockHistoryPush = jest.fn();
    jest.spyOn(history, `push`).mockImplementation(mockHistoryPush);

    it(`Redirect to Login page when user not authorized`, () => {
      jest.spyOn(store, `useAppSelector`).mockReturnValue(AuthorizationStatuses.notAuthorized);
      render(<MovieButtons id={stubId} favStatus={false} />);

      const btn = screen.getByRole(`button`, {name: /My list/i});
      userEvent.click(btn);

      expect(mockHistoryPush).toHaveBeenCalledWith(AppPaths.LOGIN);
    });

    it(`Add to list`, () => {
      render(<MovieButtons id={stubId} favStatus={false} />);

      const btn = screen.getByRole(`button`, {name: /My list/i});
      userEvent.click(btn);

      expect(mockDispatch).toHaveBeenCalledWith({id: stubId, status: true});
    });

    it(`Remove from list`, () => {
      render(<MovieButtons id={stubId} favStatus />);

      const btn = screen.getByRole(`button`, {name: /My list/i});
      userEvent.click(btn);

      expect(mockDispatch).toHaveBeenCalledWith({id: stubId, status: false});
    });

    it(`Play`, () => {
      render(<MovieButtons id={stubId} favStatus />);

      const btn = screen.getByRole(`button`, {name: /Play/i});
      userEvent.click(btn);

      expect(mockHistoryPush).toHaveBeenCalledWith(addIdParam(AppPaths.PLAYER, stubId));
    });
  });
});
