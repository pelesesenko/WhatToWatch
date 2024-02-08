import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {reviewsApi} from '../../api/api';
import {AppPaths} from '../../constants';
import {ReviewGet, ReviewPost} from '../../types/review';
import {addIdParam} from '../../utils';
import {ActionTypes} from '../action-types';
import {handleSuccess, handleError} from '../thunk-result-handlers';
import history from '../../browser-history';
import {TFilmInfoTabs} from '../../constants';
import { AppDispatch } from '../store';

// eslint-disable-next-line
type Any = any;

export const fetchFilmReviews = createAsyncThunk<
  {[key: number]: ReviewGet[]},
  number,
  {dispatch: AppDispatch}
>
(ActionTypes.fetchFilmReviews,
  async (id, {dispatch}) => {
    try {
      const response = await reviewsApi.getById(id);
      handleSuccess(dispatch);
      return {[id]: response.data};
    } catch (err: Any) {
      handleError(err, dispatch);
      throw err;
    }
  });

export const postFilmReview = createAsyncThunk<
  {[key: number]: ReviewGet[]},
  {id:number, review: ReviewPost},
  {dispatch: AppDispatch}
>
(ActionTypes.postFilmReview,
  async (data, {dispatch}) => {
    try {
      const response = await reviewsApi.postById(data.review, data.id);
      if (response.status === 200) {
        history.push(addIdParam(AppPaths.FILM, data.id));
      }
      handleSuccess(dispatch);
      return {[data.id]: response.data};
    } catch (err: Any) {
      handleError(err, dispatch);
      throw err;
    }
  });

export const currentTabChanged = createAction<TFilmInfoTabs>(ActionTypes.currentTabChanged);
