import {createSlice} from '@reduxjs/toolkit';
import {FilmInfoTabs} from '../../constants';
import {ReviewGet} from '../../types/review';
import {currentTabChanged, fetchFilmReviews, postFilmReview} from './actions';

export type InfoTabs = typeof FilmInfoTabs[number];

interface State{
  currentTab: InfoTabs;
  comments: {[key: number]: ReviewGet[]};
}

export const initialState: State = {
  currentTab: FilmInfoTabs[0],
  comments: {}
};

const filmInfoSlice = createSlice({
  name: `film-info`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.comments = Object.assign(state.comments, action.payload);
      })
      .addCase(postFilmReview.fulfilled, (state, action) => {
        state.comments = Object.assign(state.comments, action.payload);
        state.currentTab = FilmInfoTabs[2];
      })
      .addCase(currentTabChanged, (state, action) => {
        state.currentTab = action.payload;
      });
  }
});


export default filmInfoSlice.reducer;
