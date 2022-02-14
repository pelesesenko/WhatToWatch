import {TLoadingStatuses} from '../../constants';
import {LoadingError} from '../../types/common';
import {RootState} from '../store';


export const selectFavFilmsIds = (state: RootState): number[] => state.favFilms.ids;
export const selectFavFilmsStatus = (state: RootState): TLoadingStatuses => state.favFilms.status;
export const selectFavFilmsError = (state: RootState): LoadingError => state.favFilms.error;
