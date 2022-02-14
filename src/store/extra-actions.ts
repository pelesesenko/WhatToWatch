import {createAction} from '@reduxjs/toolkit';
import Film from '../types/film';
import {ActionTypes} from './action-types';


export const filmsRecieved = createAction<Film[]>(ActionTypes.filmsRecieved);

export const authorizationDenied = createAction(ActionTypes.authorizationDenied);

export const clearFilms = createAction(ActionTypes.clearFilms);

export const clearFavFilms = createAction(ActionTypes.clearFavFilms);

export const serverAvailabilityChecked = createAction<boolean>(ActionTypes.serverAvailabilityChecked);


