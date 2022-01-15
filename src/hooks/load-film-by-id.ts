import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkIdParam } from '../utilites';
import history from '../browser-history';
import { AppPaths } from '../constants';
import { fetchFilmById, selectFilmById } from '../store/slices/films-slice';
import React from 'react';
import Film from '../types/film';

interface UrlParams {
  id: string;
}

const useLoadFilmById = (isAlways: boolean): [number, Film | undefined] => {

  const dispatch = useAppDispatch();
  const {id: param} = useParams<UrlParams>();

  if (!checkIdParam(param)) {
    history.push(AppPaths.NOT_FOUND);
  }

  const id = +param;
  const film = useAppSelector((state) => selectFilmById(state, id));

  React.useEffect(() => {
    if (isAlways || film === undefined) {
      dispatch(fetchFilmById(id));
    }
  }, [film, id]);

  return [id, film];
}

export default useLoadFilmById;
