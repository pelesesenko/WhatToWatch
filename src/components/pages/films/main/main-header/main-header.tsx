import React, {FC} from 'react';
import {Pages} from '../../../../../constants';
import {selectFilmById} from '../../../../../store/films/selectors';
import {useAppSelector} from '../../../../../store/store';
import Film from '../../../../../types/film';
import FilmBackImg from '../../../../common/film-back-img/film-back-img';
import FilmDesc from '../../../../common/film-desc/film-desc';
import Header from '../../../../common/header/header';
import Poster from '../../../../common/poster/poster';

interface Props{
  promoId: number
}

const MainHeader:FC<Props> = ({promoId}) => {

  const promoFilm = useAppSelector((state) => selectFilmById(state, promoId)) as Film;

  return (
    <section className="movie-card">
      <FilmBackImg film={promoFilm} />
      <h1 className="visually-hidden">WTW</h1>
      <Header page={Pages.MAIN} />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <Poster withLink film={promoFilm} />
          <FilmDesc film={promoFilm} withLink />
        </div>
      </div>
    </section>
  );
};

export default MainHeader;
