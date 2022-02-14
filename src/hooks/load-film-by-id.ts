import React from 'react';
import {fetchFilmById} from '../store/films/actions';
import {selectFilmById} from '../store/films/selectors';
import {useAppDispatch, useAppSelector} from '../store/store';
import Film from '../types/film';

const useLoadFilmById = (id: number, isAlways: boolean): Film | undefined => {

  const dispatch = useAppDispatch();

  const film = useAppSelector((state) => selectFilmById(state, id));

  React.useEffect(() => {
    if (isAlways || film === undefined) {
      dispatch(fetchFilmById(id));
    }
  }, [film, id]);

  return film;
};

export default useLoadFilmById;
