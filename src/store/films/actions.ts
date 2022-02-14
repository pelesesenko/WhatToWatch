import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {filmsApi} from '../../api/api';
import {ActionTypes} from '../action-types';
import {handleSuccess, handleError} from '../thunk-result-handlers';

// eslint-disable-next-line
type Any = any;

export const fetchFilms = createAsyncThunk(ActionTypes.fetchFilms,
    async (_, {dispatch}) => {
      try {
        const response = await filmsApi.get();
        handleSuccess(dispatch);
        return response.data;

      } catch (err: Any) {
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

      } catch (err: Any) {
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

      } catch (err: Any) {
        handleError(err, dispatch);
        throw err;
      }
    });

export const genreChanged = createAction<string>(ActionTypes.genreChanged);

export const catalogSizeIncremented = createAction(ActionTypes.catalogSizeIncremented);
