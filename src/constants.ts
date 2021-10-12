export const AppPaths = {
  MAIN: `/`,
  LOGIN: `/login`,
  MY_LIST: `/myList`,
  FILM: `/films/:id`,
  ADD_REVIEW: `/films/:id/review`,
  PLAYER: `/player/:id`,
  NOT_FOUND: `not-found`
} as const;

export const Pages = {
  MAIN: `main`,
  LOGIN: `login`,
  MY_LIST: `myList`,
  FILM: `film`,
  ADD_REVIEW: `add-review`,
  PLAYER: `player`,
  NOT_FOUND: `not-found`
} as const;

export const MAX_GENRES_NUMBER = 9;
export const GENERAL_CATALOG_TAB = 'All genres';
