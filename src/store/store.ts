import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
// import {main} from './redusers/main/main';

import {configureStore} from '@reduxjs/toolkit';
import filmsReducer from './slices/films-slice';
import filmInfoReducer from './slices/film-info-slice';
import favFilmsReduser from './slices/fav-films-slice';
import userReduser from './slices/user-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    films: filmsReducer,
    filmInfo: filmInfoReducer,
    favFilms: favFilmsReduser,
    user: userReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
// const rootReducer = combineReducers({
//   main,
// });

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

// type RootReducerType = typeof rootReducer;
// export type AppStateType = ReturnType<RootReducerType>

// export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never



