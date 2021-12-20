import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { AppPaths, Pages } from '../../../../constants';
import Film from '../../../../types/film';
import { makeLink } from '../../../../utilites';
import Header from '../../../common/header/header';
import MovieButtons from '../../../common/movie-buttons';
import FilmInfo from './film-info';

interface Props{
  film: Film
}

const FilmContent:FC<Props> = ({film}) => {

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header page={Pages.FILM} />
        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.released}</span>
            </p>
            <div className="movie-card__buttons">
              <MovieButtons id={film.id} favStatus={film.isFavorite} />
              <Link to={makeLink(AppPaths.ADD_REVIEW, film.id)} className="btn movie-card__button">Add review</Link>
            </div>
          </div>
        </div>
      </div>
      <FilmInfo film={film} />
    </section>
  );
};
export default FilmContent;
