import {ReviewGet} from '../../types/review';
import {RootState} from '../store';
import {TFilmInfoTabs} from './../../constants';


export const selectFilmCurrentTab = (state: RootState): TFilmInfoTabs => state.filmInfo.currentTab;
export const selectFilmReviews = (state: RootState, filmId: number): ReviewGet[] => state.filmInfo.comments[filmId];
