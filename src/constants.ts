// business constants
export const AppPaths = {
  MAIN: '/',
  LOGIN: '/login',
  MY_LIST: '/myList',
  FILM: '/films/:id',
  ADD_REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
  NOT_FOUND: '/not-found'
} as const;

export const Pages = {
  MAIN: 'main',
  LOGIN: 'login',
  MY_LIST: 'my-list',
  FILM: 'film',
  ADD_REVIEW: 'add-review',
  PLAYER: 'player',
  NOT_FOUND: 'not-found'
} as const;

export const MAX_GENRES_NUMBER = 9;
export const DEFAULT_CATALOG_TAB = 'All genres';
export const DEFAULT_CATALOG_SIZE = 8;
export const MAX_ALIKE_FILMS = 4;
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;

// development constants

export enum FormErrorMessages {
  rating = 'Please select a rating',
  comment = 'Your comment must be 50 - 400 characters long',
  email = 'Email is not valid',
  password = 'Password is required',
}

export const LoadingStatuses = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
} as const;

export type TLoadingStatuses = typeof LoadingStatuses[keyof typeof LoadingStatuses];

export const AuthorizationStatuses = {
  authorized: 'authorized',
  notAuthorized: 'not-authorized',
} as const;

export type TAuthorizationStatuses = typeof AuthorizationStatuses[keyof typeof AuthorizationStatuses];

export const FilmInfoTabs = {
  overview: 'Overview',
  details: 'Details',
  reviews: 'Reviews',
} as const;

export type TFilmInfoTabs = typeof FilmInfoTabs[keyof typeof FilmInfoTabs];

export const FilmDetailsTitles = {
  director: 'Director',
  starring: 'Starring',
  runtime: 'Run Time',
  genre: 'Genre',
  released: 'Released',
} as const;
