import React from 'react';
import {mockHistory, render, waitFor} from '../../../tests/utils';
import FilmsContainer from './films-container';

import * as store from '../../../store/store';
import * as filmsSliceActions from '../../../store/films/actions';
import {Any} from '../../../types/common';
import {AppPaths, LoadingStatuses} from '../../../constants';
import {addIdParam} from '../../../utils';

const mockFilmsStatusSelector = jest.spyOn(store, 'useAppSelector');
mockFilmsStatusSelector.mockReturnValue(LoadingStatuses.idle);

const mockDispatch = jest.fn();
jest.spyOn(store, 'useAppDispatch').mockReturnValue(mockDispatch);

const fakeFetchFilmsAction: Any = 'fake fetchFilms action';
jest.spyOn(filmsSliceActions, 'fetchFilms').mockImplementation(() => fakeFetchFilmsAction);

const mockMain = jest.fn(() => null);
jest.mock(
  './main/main.tsx',
  () => jest.fn(() => mockMain())
);

const mockWithExtractId = jest.fn(() => null);
jest.mock(
  '../../../hocs/withExtractIdParam.tsx',
  () => jest.fn(() => mockWithExtractId)
);

describe('FilmsContainer component', () => {
  it('dispatches fetchFilms action if films are not loaded', () => {
    render(<FilmsContainer />);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(fakeFetchFilmsAction);
  });

  it('renders children with correct routing. Film page (with hoc)', async () => {

    mockHistory.push(addIdParam(AppPaths.FILM, 1));
    render(<FilmsContainer />);

    await waitFor(() => {
      expect(mockWithExtractId).toBeCalledTimes(1);
    });
    expect(mockMain).toBeCalledTimes(0);
  });

  it('renders children with correct routing. Main page', async () => {

    mockHistory.push(AppPaths.MAIN);
    render(<FilmsContainer />);

    expect(mockMain).toBeCalledTimes(1);
    await waitFor(() => {
      expect(mockWithExtractId).toBeCalledTimes(0);
    });
  });
});
