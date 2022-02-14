import {ReviewGet} from '../../types/review';
import {RootState} from '../store';
import {InfoTabs} from './reducer';


export const selectFilmCurrentTab = (state: RootState): InfoTabs => state.filmInfo.currentTab;
export const selectFilmReviews = (state: RootState, filmId: number): ReviewGet[] => state.filmInfo.comments[filmId];
