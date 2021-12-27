import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { favoriteApi } from '../../api/api';
import { LoadingStatuses } from '../../constants';
import { ActionTypes, authorizationDenied, filmsRecieved } from '../extra-actions';
import { RootState } from '../store';
import { handleError, handleSuccess } from '../thunk-error-handlers';

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
    try {
      const response = await favoriteApi.get();
      dispatch(filmsRecieved(response.data));
      handleSuccess(dispatch);
      return response.data;
    }
    catch(err: any) {
      handleError(err, dispatch);
      throw err;
    }
});

export const postFavStatus = createAsyncThunk(ActionTypes.postFavStatus,
  async (params: {id: number, status: boolean}, {dispatch}) => {
    try {
      const response = await favoriteApi.postByParams(params.id, params.status);
      dispatch(filmsRecieved([response.data]));
      handleSuccess(dispatch);
      return response.data;
    }
    catch(err: any) {
      handleError(err, dispatch);
      throw err;
    }
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
        if(!action.payload.isFavorite) {
          state.ids.filter((id) => id !== action.payload.id);
        } else if(!state.ids.includes(action.payload.id)) state.ids.push(action.payload.id);
      })
      .addCase(authorizationDenied, (state) => {
        state.status = LoadingStatuses.idle;
        state.ids = []
      })
  }
});

export const {} = favFilmsSlice.actions;

export const selectFavFilmsIds = (state: RootState) => state.favFilms.ids;
export const selectFavFilmsStatus = (state: RootState) => state.favFilms.status;
export const selectFavFilmsError = (state: RootState) => state.favFilms.error;

export default favFilmsSlice.reducer;
