import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {main} from './redusers/main/main';

const rootReducer = combineReducers({
  main,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never


export default store;

