import {configureStore} from '@reduxjs/toolkit';
import films from './films/reducer';
import filmInfo from './film-info/reducer';
import favFilms from './fav-films/reducer';
import user from './user/reducer';
import server from './server/reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
