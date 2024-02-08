import {createSlice} from '@reduxjs/toolkit';
import {LoadingStatuses, TLoadingStatuses} from '../../constants';
import {LoadingError} from '../../types/common';
import {clearFavFilms} from '../extra-actions';
import {fetchFavFilms, postFavStatus} from './actions';

interface State{
  status: TLoadingStatuses;
  error: LoadingError;
  ids: {[key: number]: number};
}

export const initialState: State = {
  status: LoadingStatuses.idle,
  error: null,
  ids: {}
};


const favFilmsSlice = createSlice({
  name: 'fav-films',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavFilms.fulfilled, (state, action) => {
        state.status = LoadingStatuses.fulfilled;
        state.ids = action.payload.reduce((prev, current) => {
          prev[current.id] = current.id;
          return prev;
        }, {} as {[key: number]: number});
      })
      .addCase(postFavStatus.fulfilled, (state, action) => {
        if (!action.payload.isFavorite) {
          delete state.ids[action.payload.id];
        } else {
          state.ids[action.payload.id] = action.payload.id;
        }
      })
      .addCase(clearFavFilms, (state) => {
        state.status = LoadingStatuses.idle;
        state.ids = {};
      });
  }
});

export default favFilmsSlice.reducer;
