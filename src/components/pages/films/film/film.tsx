import React, {FC} from 'react';
import Header from '../../../common/header/header';
import {AppPaths, LoadingStatuses, Pages} from '../../../../constants';
import Footer from '../../../common/footer';

import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {fetchFilmById, selectFilmById, selectFilmsLoadingStatus} from '../../../../store/slices/films-slice';
import FilmsLikeThis from './films-like-this';
import FilmContent from './film-content';
import { checkIdParam } from '../../../../utilites';
import history from '../../../../browser-history';

interface UrlParams{
  id: string
}

const Film:FC = () => {
  const dispatch = useAppDispatch();

  const {id: param} = useParams<UrlParams>();

  if(!checkIdParam(param)) history.push(AppPaths.NOT_FOUND);

  const id = +param;
  const film = useAppSelector((state) => selectFilmById(state, id));
  const filmsLoadingStatus = useAppSelector(selectFilmsLoadingStatus);

  React.useEffect(() => {
    if(film === undefined) {
      dispatch(fetchFilmById(id))
    }
  }, [film, id])

  return (
    <>
      {film
        ? <FilmContent film={film} />
        : <h1>Loading...</h1>
      }
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {film && (filmsLoadingStatus === LoadingStatuses.fulfilled)
           ? <FilmsLikeThis genre={film.genre} id={id} />
           : <h1>Loading...</h1>}
        </section>
        <Footer main={false}/>
      </div>
    </>
  );
};
export default Film;
