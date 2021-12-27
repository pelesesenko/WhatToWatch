import {createAction} from '@reduxjs/toolkit';
import Film from '../types/film';

export const ActionTypes = {
  filmsRecieved: 'films/films-recieved',
  fetchFilms: 'films/fetch-films',
  fetchFilmById: 'films/fetch-film-by-id',
  fetchFilmPromo: 'films/fetch-film-promo',
  fetchFilmReviews: 'film-info/fetch-reviews',
  postFilmReview: 'film-info/post-review',
  fetchFavFilms: 'fav-films/fetch-fav-films',
  postFavStatus: 'fav-films/post-fav-status',
  fetchAuth: 'user/fetch-authorization',
  login: 'user/login',
  logout: 'user/logout',
  authorizationDenied: 'user/authorizationDenied',
  serverAvailabilityChecked: 'server/availabilityChecked',
} as const;

export const filmsRecieved = createAction<Film[]>(ActionTypes.filmsRecieved);

export const authorizationDenied = createAction(ActionTypes.authorizationDenied);

export const serverAvailabilityChecked = createAction<boolean>(ActionTypes.serverAvailabilityChecked);



