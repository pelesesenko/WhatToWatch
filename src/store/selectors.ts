import { createSelector } from "reselect";
import Film, {FilmIdsByGenre} from "../types/film";
import { AppStateType } from "./store";


const selectAllFilms = (state: AppStateType) => state.main.catalog.films;

export const selectIsCatalogLoaded = (state: AppStateType) => state.main.catalog.isLoaded;
export const selectFilmById = (state: AppStateType, id: number) => state.main.catalog.films[id];



// export const selectAllFilms = createSelector(
//   selectAllFilms,
//   (films) => Object.values(films)
// );

export const selectAllFilmIds = createSelector(
  selectAllFilms,
  (films) => Object.keys(films).map((key) => Number(key))
);

export const selectFilmIdsByGenre = createSelector(
  selectAllFilms,
  (films) => Object.values(films).reduce((p: FilmIdsByGenre, c: Film): FilmIdsByGenre => {
    return {...p, [c.genre]: [...p[c.genre] || [], c.id]}
  }, {})
);
