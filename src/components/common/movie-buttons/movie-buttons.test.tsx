import React from 'react';
import {render, screen} from '../../../tests/utils';
import * as store from '../../../store/store';
import * as favSlice from '../../../store/fav-films/actions';
import history from '../../../browser-history';
import MovieButtons from './movie-buttons';
import userEvent from '@testing-library/user-event';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import {addIdParam} from '../../../utils';
// import {AppPaths} from '../../../constants';
// import {addIdParam} from '../../../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const stubId = 1;

// let spyUseSelector: Any;

// const spyUseSelector = jest.spyOn(store, `useAppSelector`);
// spyUseSelector.mockReturnValue(AuthorizationStatuses.authorized);

let spyUseSelector: Any;

beforeEach(() => {
  spyUseSelector = jest.spyOn(store, `useAppSelector`);
  spyUseSelector.mockReturnValue(AuthorizationStatuses.authorized);
});


describe(`MovieButtons component`, () => {
  describe(`Should render correctly`, () => {
    it(`Play button should be rendered`, () => {

      render(<MovieButtons id={stubId} favStatus />);
      const text = screen.getByText(/Play/i);
      expect(screen.getAllByRole(`button`)[0]).toContainElement(text);
    });

    it(`MyList button should be rendered`, () => {

      render(<MovieButtons id={stubId} favStatus />);

      const text = screen.getByText(/My list/i);
      expect(screen.getAllByRole(`button`)[1]).toContainElement(text);
    });
  });

  describe(`Should handle MyList button click correctly`, () => {

    let mockDispatch: Any;
    beforeEach(() => {

      mockDispatch = jest.fn();
      const spyUseDispatch = jest.spyOn(store, `useAppDispatch`);
      spyUseDispatch.mockReturnValue(mockDispatch);

      const mockActionCreator = jest.spyOn(favSlice, `postFavStatus`);
      const mockImplementation = ((data: Any) => data) as unknown as typeof favSlice.postFavStatus;
      mockActionCreator.mockImplementation(mockImplementation);
    });

    it(`Add to list`, () => {
      render(<MovieButtons id={stubId} favStatus={false} />);

      const btn = screen.getByText(/My list/i).parentElement as HTMLElement;
      userEvent.click(btn);

      expect(mockDispatch).toHaveBeenCalledWith({id: stubId, status: true});
    });

    it(`Remove from list`, () => {
      render(<MovieButtons id={stubId} favStatus />);

      const btn = screen.getByText(/My list/i).parentElement as HTMLElement;
      userEvent.click(btn);
      expect(mockDispatch).toHaveBeenCalledWith({id: stubId, status: false});
    });
  });

  it(`Should handle Play button click correctly`, () => {
    jest.mock(`../../../browser-history`); // ???
    history.push = jest.fn(() => `Hello`);

    render(<MovieButtons id={stubId} favStatus />);

    const btn = screen.getByText(/Play/i).parentElement as HTMLElement;
    userEvent.click(btn);
    expect(history.push).toHaveBeenCalledWith(addIdParam(AppPaths.PLAYER, stubId));
  });
});
