import {createAsyncThunk} from '@reduxjs/toolkit';
import {userApi} from '../../api/api';
import {UserPost} from '../../types/user';
import {ActionTypes} from '../action-types';
import {clearFavFilms, clearFilms} from '../extra-actions';
import {handleSuccess, handleError} from '../thunk-result-handlers';

// eslint-disable-next-line
type Any = any;

export const fetchAuth = createAsyncThunk(ActionTypes.fetchAuth,
    async (_, {dispatch}) => {
      try {
        const response = await userApi.getUser();
        handleSuccess(dispatch);
        return response.data;

      } catch (err: Any) {
        handleError(err, dispatch);
        throw err;
      }
    });

export const login = createAsyncThunk(ActionTypes.login,
    async (data: UserPost, {dispatch}) => {
      try {
        const response = await userApi.post(data);
        handleSuccess(dispatch);
        return response.data;

      } catch (err: Any) {
        handleError(err, dispatch);
        throw err;
      }
    });

export const logout = createAsyncThunk(ActionTypes.logout,
    async (_, {dispatch}) => {
      try {
        await userApi.logout();
        dispatch(clearFavFilms());
        dispatch(clearFilms());
        handleSuccess(dispatch);

      } catch (err: Any) {
        handleError(err, dispatch);
        throw err;
      }
    });
