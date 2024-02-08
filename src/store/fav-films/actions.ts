import {createAsyncThunk} from '@reduxjs/toolkit';
import {favoriteApi} from '../../api/api';
import Film from '../../types/film';
import {ActionTypes} from '../action-types';
import {filmsRecieved} from '../extra-actions';
import { AppDispatch } from '../store';
import {handleSuccess, handleError} from '../thunk-result-handlers';

// eslint-disable-next-line
type Any = any;

export const fetchFavFilms = createAsyncThunk<
  Film[],
  void,
  {dispatch: AppDispatch}
>
(ActionTypes.fetchFavFilms,
  async (_, {dispatch}) => {
    try {
      const response = await favoriteApi.get();
      dispatch(filmsRecieved(response.data));
      handleSuccess(dispatch);
      return response.data;
    } catch (err: Any) {
      handleError(err, dispatch);
      throw err;
    }
  });

export const postFavStatus = createAsyncThunk<
  Film,
  {id: number, status: boolean},
  {dispatch: AppDispatch}
>
(ActionTypes.postFavStatus,
  async (params: {id: number, status: boolean}, {dispatch}) => {
    try {
      const response = await favoriteApi.postByParams(params.id, params.status);
      dispatch(filmsRecieved([response.data]));
      handleSuccess(dispatch);
      return response.data;
    } catch (err: Any) {
      handleError(err, dispatch);
      throw err;
    }
  });
