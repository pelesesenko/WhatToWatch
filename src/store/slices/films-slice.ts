import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  EntityState,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {DEFAULT_CATALOG_SIZE, LoadingStatuses, MAX_ALIKE_FILMS, TLoadingStatuses} from '../../constants';
import type Film from '../../types/film';
import {DEFAULT_CATALOG_TAB} from '../../constants';
import {RootState} from '../store';
import {ActionTypes, filmsRecieved} from '../extra-actions';
import {filmsApi} from '../../api/api';
import {handleError, handleSuccess} from '../thunk-result-handlers';

type Error = SerializedError | null;

interface ExtraState {
  status: TLoadingStatuses,
  error: Error,
  promoId: number | null,
  currentGenre: string,
  catalogSize: number
}

const filmsAdapter = createEntityAdapter<Film>();

const initialState: ExtraState & EntityState<Film> = filmsAdapter.getInitialState({
  status: LoadingStatuses.idle,
  error: null,
  promoId: null,
  currentGenre: DEFAULT_CATALOG_TAB,
  catalogSize: DEFAULT_CATALOG_SIZE,
});

export const fetchFilms = createAsyncThunk(ActionTypes.fetchFilms,
    async (_, {dispatch}) => {
      try {
        const response = await filmsApi.get();
        handleSuccess(dispatch);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        handleError(err, dispatch);
        throw err;
      }
    });

export const fetchFilmById = createAsyncThunk(ActionTypes.fetchFilmById,
    async (id: number, {dispatch}) => {
      try {
        const response = await filmsApi.getById(id);
        handleSuccess(dispatch);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        handleError(err, dispatch);
        throw err;
      }
    });

export const fetchFilmPromo = createAsyncThunk(ActionTypes.fetchFilmPromo,
    async (_, {dispatch}) => {
      try {
        const response = await filmsApi.getPromo();
        handleSuccess(dispatch);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        handleError(err, dispatch);
        throw err;
      }
    });

const filmsSlice = createSlice({
  name: `films`,
  initialState,
  reducers: {
    genreChanged(state, action: PayloadAction<string>) {
      state.currentGenre = action.payload;
    },
    incrementCatalogSize(state) {
      state.catalogSize += DEFAULT_CATALOG_SIZE;
    }
  },
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
   .addCase(filmsRecieved, filmsAdapter.setMany);
  },
});

export const {genreChanged, incrementCatalogSize} = filmsSlice.actions;

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = filmsAdapter.getSelectors((state: RootState) => state.films);

export const selectFilmsLoadingStatus = (state: RootState): TLoadingStatuses => state.films.status;
export const selectFilmsLoadingError = (state: RootState): Error => state.films.error;
export const selectFilmsPromoId = (state: RootState): number | null => state.films.promoId;
export const selectFilmsCurrentGenre = (state: RootState): string => state.films.currentGenre;
export const selectFilmsCatalogSize = (state: RootState): number => state.films.catalogSize;

export const selectGenres = createSelector(
    selectAllFilms,
    (films) => Array.from(new Set(films.map((film) => film.genre)))
);

export const selectIdsByGenre = createSelector(
    selectAllFilms, (_: RootState, genre: string) => genre,
    (films, genre) => {
      return genre === DEFAULT_CATALOG_TAB
        ? films.map((film) => film.id)
        : films.filter((film) => film.genre === genre).map((film) => film.id);
    }
);

export const selectFilmIdsSameGenre = createSelector(
    selectAllFilms, selectFilmById,
    (films, film) => {
      if (film) {
        const {genre, id} = film;

        return films.filter((item) => item.genre === genre && item.id !== id)
      .map((item) => item.id)
      .slice(0, MAX_ALIKE_FILMS);
      }
      return [];
    }
);

export default filmsSlice.reducer;


