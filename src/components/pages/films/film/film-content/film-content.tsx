import React, {FC} from 'react';
import {Pages} from '../../../../../constants';
import Film from '../../../../../types/film';
import FilmBackImg from '../../../../common/film-back-img/film-back-img';
import FilmDesc from '../../../../common/film-desc/film-desc';
import Header from '../../../../common/header/header';
import FilmInfo from '../film-info/film-info';

interface Props{
  film: Film
}

const FilmContent:FC<Props> = ({film}) => {

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="movie-card__hero">
        <FilmBackImg film={film} />
        <h1 className="visually-hidden">WTW</h1>
        <Header page={Pages.FILM} />
        <div className="movie-card__wrap">
          <FilmDesc film={film} withAddReview />
        </div>
      </div>
      <FilmInfo film={film} />
    </section>
  );
};

export default FilmContent;
