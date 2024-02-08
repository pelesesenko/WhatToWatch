import {createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit';
import {DEFAULT_CATALOG_SIZE, DEFAULT_CATALOG_TAB, LoadingStatuses, TLoadingStatuses} from '../../constants';
import {LoadingError} from '../../types/common';
import type Film from '../../types/film';
import {clearFilms, filmsRecieved} from '../extra-actions';
import {RootState} from '../store';
import {catalogSizeIncremented, fetchFilmById, fetchFilmPromo, fetchFilms, genreChanged} from './actions';

interface ExtraState {
  status: TLoadingStatuses;
  error: LoadingError;
  promoId: number | null;
  currentGenre: string;
  catalogSize: number;
}

const filmsAdapter = createEntityAdapter<Film>();

export const initialState: ExtraState & EntityState<Film> = filmsAdapter.getInitialState({
  status: LoadingStatuses.idle,
  error: null,
  promoId: null,
  currentGenre: DEFAULT_CATALOG_TAB,
  catalogSize: DEFAULT_CATALOG_SIZE,
});

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = LoadingStatuses.fulfilled;
        filmsAdapter.addMany(state, action.payload);
      })
      .addCase(fetchFilmPromo.fulfilled, (state, action) => {
        filmsAdapter.addOne(state, action.payload);
        state.promoId = action.payload.id;
      })

      .addCase(fetchFilmById.fulfilled, filmsAdapter.addOne)

      .addCase(filmsRecieved, filmsAdapter.setMany)

      .addCase(clearFilms, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(catalogSizeIncremented, (state) => {
        state.catalogSize += DEFAULT_CATALOG_SIZE;
      })
      .addCase(genreChanged, (state, action) => {
        state.currentGenre = action.payload;
      });
  },
});

export const adapterSelectors = filmsAdapter.getSelectors((state: RootState) => state.films);

export default filmsSlice.reducer;
