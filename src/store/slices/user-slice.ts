import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { AuthorizationStatuses } from '../../constants';
import { UserGet, UserPost } from '../../types/user';
import { ActionTypes } from '../extra-actions';
import { mockUser } from '../mock';
import { RootState } from '../store';

interface State{
  status: typeof AuthorizationStatuses[keyof typeof AuthorizationStatuses] | null,
  user: UserGet | null,
}

const initialState: State = {
  status: null,
  user: null,
}

export const fetchAuth = createAsyncThunk(ActionTypes.fetchAuth,
  async () => {
  // const response = await client.get('/fakeApi/users')
  return mockUser; //response.data
});

export const login = createAsyncThunk(ActionTypes.login,
  async (data: UserPost) => {
  // const response = await client.get('/fakeApi/users')
  return mockUser; //response.data
});

export const logout = createAsyncThunk(ActionTypes.logout,
  async () => {
  // const response = await client.get('/fakeApi/users')
  //return null; //response.data
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = AuthorizationStatuses.authorized;
        state.user= action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = AuthorizationStatuses.notAuthorized;
        state.user= null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = AuthorizationStatuses.authorized;
        state.user= action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = AuthorizationStatuses.notAuthorized;
        state.user= null;
      })
  }
});

export const {} = userSlice.actions;

export const selectAuthStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
