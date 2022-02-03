import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths} from '../../../constants';
import Film from '../../../types/film';
import {addIdParam} from '../../../utils';
import MovieButtons from '../movie-buttons/movie-buttons';

interface Props {
  film: Film;
  withLink?: true;
  withAddReview?: true;
}

const FilmDesc:FC<Props> = ({film, withLink, withAddReview}) => {

  const link = addIdParam(AppPaths.FILM, film.id);
  const linkStyle = {color: `inherit`, textDecoration: `none`};

  const child = <h2 className="movie-card__title">{film.name}</h2>;
  const title = withLink ? <Link to={link} style={linkStyle} >{child}</Link> : child;

  return (
    <div className="movie-card__desc">
      {title}
      <p className="movie-card__meta">
        <span className="movie-card__genre">{film.genre}</span>
        <span className="movie-card__year">{film.released}</span>
      </p>
      <MovieButtons id={film.id} favStatus={film.isFavorite} withAddReview={withAddReview} />
    </div>
  );
};

export default FilmDesc;
