import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from '@reduxjs/toolkit';
import { AppPaths, FilmInfoTabs } from '../../constants';
import { ReviewGet, ReviewPost } from '../../types/review';
import { ActionTypes } from '../extra-actions';
import { mockComments } from '../mock';
import { RootState } from '../store';
import history from '../../browser-history'
import { makeLink } from '../../utilites';
import { reviewsApi } from '../../api/api';
import { handleError, handleSuccess } from '../thunk-error-handlers';

type InfoTabs = typeof FilmInfoTabs[number];
interface State{
  currentTab: InfoTabs;
  comments: {[key: number]: ReviewGet[]};
}

const initialState: State = {
  currentTab: FilmInfoTabs[0],
  comments: {}
}

export const fetchFilmReviews = createAsyncThunk(ActionTypes.fetchFilmReviews,
  async (id: number, {dispatch}) => {
    try {
      const response = await reviewsApi.getById(id);
      handleSuccess(dispatch);
      return {[id]: response.data};
    }
    catch(err: any) {
      handleError(err, dispatch);
      throw err;
    }
});
export const postFilmReview = createAsyncThunk(ActionTypes.postFilmReview,
  async (data: {id:number, review: ReviewPost}, {dispatch}) => {
    try {
      const response = await reviewsApi.postById(data.review, data.id);
      if(response.status === 200) {
        history.push(makeLink(AppPaths.FILM, data.id));
      }
      handleSuccess(dispatch);
      return {[data.id]: response.data};
    }
    catch(err: any) {
      handleError(err, dispatch);
      throw err;
    }
});

const filmInfoSlice = createSlice({
  name: 'film-info',
  initialState,
  reducers: {
    currentTabChanged(state, action: PayloadAction<InfoTabs>) {
      state.currentTab = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.comments = Object.assign(state.comments, action.payload)
      })
      .addCase(postFilmReview.fulfilled, (state, action) => {
        state.comments = Object.assign(state.comments, action.payload)
      })
  }
});

export const {currentTabChanged} = filmInfoSlice.actions;

export const selectFilmCurrentTab = (state: RootState) => state.filmInfo.currentTab;
export const selectFilmReviews = (state: RootState, filmId: number) => state.filmInfo.comments[filmId];


export default filmInfoSlice.reducer;
