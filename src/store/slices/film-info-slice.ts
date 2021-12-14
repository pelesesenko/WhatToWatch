import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { FilmInfoTabs } from '../../constants';
import { ReviewGet, ReviewPost } from '../../types/review';
import { ActionTypes } from '../extra-actions';
import { mockComments } from '../mock';
import { RootState } from '../store';

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
  async (id: number) => {
  // const response = await client.get('/fakeApi/users')
  return {[id]: mockComments[id]}; //response.data
});
export const postFilmReview = createAsyncThunk(ActionTypes.postFilmReview,
  async (data: {id:number, review: ReviewPost}) => {
  // const response = await client.get('/fakeApi/users')
  return {[data.id]: mockComments[data.id]}; //response.data
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
