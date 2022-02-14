import {TAuthorizationStatuses} from '../../constants';
import {UserGet} from '../../types/user';
import {RootState} from '../store';


export const selectAuthStatus = (state: RootState): TAuthorizationStatuses | null => state.user.status;
export const selectUser = (state: RootState): UserGet | null => state.user.user;
