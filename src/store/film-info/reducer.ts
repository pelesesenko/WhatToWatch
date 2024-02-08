import {createSlice} from '@reduxjs/toolkit';
import {FilmInfoTabs, TFilmInfoTabs} from '../../constants';
import {ReviewGet} from '../../types/review';
import {currentTabChanged, fetchFilmReviews, postFilmReview} from './actions';

interface State{
  currentTab: TFilmInfoTabs;
  comments: {[key: number]: ReviewGet[]};
}

export const initialState: State = {
  currentTab: FilmInfoTabs.overview,
  comments: {}
};

const filmInfoSlice = createSlice({
  name: 'film-info',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.comments = Object.assign(state.comments, action.payload);
      })
      .addCase(postFilmReview.fulfilled, (state, action) => {
        state.comments = Object.assign(state.comments, action.payload);
        state.currentTab = FilmInfoTabs.reviews;
      })
      .addCase(currentTabChanged, (state, action) => {
        state.currentTab = action.payload;
      });
  }
});


export default filmInfoSlice.reducer;
