import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../constants';
import { ActionTypes, filmsRecieved } from '../extra-actions';
import { mockFilms } from '../mock';
import { RootState } from '../store';

interface State{
  status: keyof typeof LoadingStatuses,
  error: null,
  ids: number[]
}

const initialState: State = {
  status: LoadingStatuses.idle,
  error: null,
  ids: []
}

export const fetchFavFilms = createAsyncThunk(ActionTypes.fetchFavFilms,
  async (_, {dispatch}) => {
  // const response = await client.get('/fakeApi/users')
  dispatch(filmsRecieved(mockFilms.slice(0, 7)))
  return mockFilms.slice(0, 7); //response.data
});

export const postFavStatus = createAsyncThunk(ActionTypes.postFavStatus,
  async (data: {id: number, status: boolean}, {dispatch}) => {
  // const response = await client.get('/fakeApi/users')
  dispatch(filmsRecieved([mockFilms[data.id]]));
  return data; //response.data
});


const favFilmsSlice = createSlice({
  name: 'fav-films',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavFilms.fulfilled, (state, action) => {
        state.status = LoadingStatuses.fulfilled;
        state.ids = action.payload.map((film) => film.id)
      })
      .addCase(postFavStatus.fulfilled, (state, action) => {
        if(!action.payload.status) state.ids.filter((id) => id !== action.payload.id);
        if(!state.ids.includes(action.payload.id)) state.ids.push(action.payload.id);
      })
  }
});

export const {} = favFilmsSlice.actions;

export const selectFavFilmsIds = (state: RootState) => state.favFilms.ids;
export const selectFavFilmsStatus = (state: RootState) => state.favFilms.status;
export const selectFavFilmsError = (state: RootState) => state.favFilms.error;

// export const selectFavStatus = createSelector(
//   selectFavFilmsIds, (_: RootState, id: number) => id,
//   (ids, id) => ids.includes(id)
// );


export default favFilmsSlice.reducer;
