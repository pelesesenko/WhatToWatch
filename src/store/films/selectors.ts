import {createSelector} from 'reselect';
import {TLoadingStatuses, DEFAULT_CATALOG_TAB, MAX_ALIKE_FILMS} from '../../constants';
import {LoadingError} from '../../types/common';
import {RootState} from '../store';
import {adapterSelectors} from './reducer';

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = adapterSelectors;

export const selectFilmsLoadingStatus = (state: RootState): TLoadingStatuses => state.films.status;
export const selectFilmsLoadingError = (state: RootState): LoadingError => state.films.error;
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
