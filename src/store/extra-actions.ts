import {createAction} from '@reduxjs/toolkit';
import Film from '../types/film';
import { mockFilms } from './mock';

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
} as const;

export const filmsRecieved = createAction<Film[]>(ActionTypes.filmsRecieved);



