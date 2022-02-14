import {RootState} from '../store';

export const selectIsServerAvailable = (state: RootState): boolean => state.server.isAvailable;
