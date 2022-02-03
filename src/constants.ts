// business constants
export const AppPaths = {
  MAIN: `/`,
  LOGIN: `/login`,
  MY_LIST: `/myList`,
  FILM: `/films/:id`,
  ADD_REVIEW: `/films/:id/review`,
  PLAYER: `/player/:id`,
  NOT_FOUND: `/not-found`
} as const;

export const Pages = {
  MAIN: `main`,
  LOGIN: `login`,
  MY_LIST: `my-list`,
  FILM: `film`,
  ADD_REVIEW: `add-review`,
  PLAYER: `player`,
  NOT_FOUND: `not-found`
} as const;

export const MAX_GENRES_NUMBER = 9;
export const DEFAULT_CATALOG_TAB = `All genres`;
export const DEFAULT_CATALOG_SIZE = 8;
export const MAX_ALIKE_FILMS = 4;

// development constants

export const LoadingStatuses = {
  idle: `idle`,
  pending: `pending`,
  fulfilled: `fulfilled`,
  rejected: `rejected`,
} as const;

export type TLoadingStatuses = typeof LoadingStatuses[keyof typeof LoadingStatuses];

export const AuthorizationStatuses = {
  authorized: `authorized`,
  notAuthorized: `not-authorized`,
} as const;

export type TAuthorizationStatuses = typeof AuthorizationStatuses[keyof typeof AuthorizationStatuses];

export const FilmInfoTabs = [
  `Overview`,
  `Details`,
  `Reviews`,
] as const;

export const FilmDetailsTitles = {
  director: `Director`,
  starring: `Starring`,
  runtime: `Run Time`,
  genre: `Genre`,
  released: `Released`,
} as const;
