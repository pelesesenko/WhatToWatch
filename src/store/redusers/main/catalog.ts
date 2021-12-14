// import {mockFilms} from '../mock';
// import Film from '../../../types/film';
// import { InferActionType } from 'src/store/store';
// import { GENERAL_CATALOG_TAB } from '../../../constants';

// type ActionType = InferActionType<typeof ActionCreators>;
// type InitialStateType = typeof initialState;

// type Films = Record<number, Film>//{[keys: number]: Film};
// type TabSizes = {[keys: string]: number}

// export const initialState = {
//   isLoaded: false,
//   films: {} as Films,
//   tabSizes: {} as TabSizes,
//   currentGenre: GENERAL_CATALOG_TAB,

// };

// const ActionTypesList = {
//   FILMS_LOADED: 'main/catalog/films-loaded',
//   CATALOG_LOADED: 'main/catalog/all-films-loaded'
// } as const;

// export const catalog = (state = initialState, action: ActionType): InitialStateType => {

//   switch (action.type) {
//     case ActionTypesList.FILMS_LOADED:
//       return {
//         ...state,
//         films: {...state.films, ...action.payload.reduce((p: Films, c: Film): Films => ({...p, [c.id]: c}), {})}
//       };
//     case ActionTypesList.CATALOG_LOADED:
//     return {
//       ...state,
//       isLoaded: true,
//     };
//     default:
//       return state;
//   }
// };

// export const ActionCreators = {
//    filmsLoaded: (films: Film[]) => ({type: ActionTypesList.FILMS_LOADED, payload: films} as const),
//    allFilmsLoaded: () => ({type: ActionTypesList.CATALOG_LOADED})
// };
