import {configureStore} from '@reduxjs/toolkit';
import films from './slices/films-slice';
import filmInfo from './slices/film-info-slice';
import favFilms from './slices/fav-films-slice';
import user from './slices/user-slice';
import server from './slices/server-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const store = configureStore({
  reducer: {
    films,
    filmInfo,
    favFilms,
    user,
    server,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
