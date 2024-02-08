import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatuses, TAuthorizationStatuses} from '../../constants';
import {UserGet} from '../../types/user';
import {authorizationDenied} from '../extra-actions';
import {fetchAuth, login, logout} from './actions';

interface State{
  status: TAuthorizationStatuses | null;
  user: UserGet | null;
}

const initialState: State = {
  status: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = AuthorizationStatuses.authorized;
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = AuthorizationStatuses.notAuthorized;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = AuthorizationStatuses.authorized;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = AuthorizationStatuses.notAuthorized;
        state.user = null;
      })
      .addCase(authorizationDenied, (state) => {
        state.status = AuthorizationStatuses.notAuthorized;
        state.user = null;
      });
  }
});

export default userSlice.reducer;
