import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {userApi} from '../../api/api';
import {AuthorizationStatuses, TAuthorizationStatuses} from '../../constants';
import {UserGet, UserPost} from '../../types/user';
import {ActionTypes, authorizationDenied} from '../extra-actions';
import {RootState} from '../store';
import {handleError, handleSuccess} from '../thunk-result-handlers';

interface State{
  status: TAuthorizationStatuses | null,
  user: UserGet | null,
}

const initialState: State = {
  status: null,
  user: null,
};

export const fetchAuth = createAsyncThunk(ActionTypes.fetchAuth,

    async (_, {dispatch}) => {
      try {
        const response = await userApi.getUser();
        handleSuccess(dispatch);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        handleError(err, dispatch);
        throw err;
      }
    });

export const logout = createAsyncThunk(ActionTypes.logout,
    async (_, {dispatch}) => {
      try {
        const response = await userApi.logout();
        dispatch(authorizationDenied());
        handleSuccess(dispatch);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        handleError(err, dispatch);
        throw err;
      }
    });


const userSlice = createSlice({
  name: `user`,
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

export const {} = userSlice.actions;

export const selectAuthStatus = (state: RootState): TAuthorizationStatuses | null => state.user.status;
export const selectUser = (state: RootState): UserGet | null => state.user.user;

export default userSlice.reducer;
