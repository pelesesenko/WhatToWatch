import React, {FC} from 'react';
import Film from '../../../../types/film';
import { convertRating } from '../../../../utilites';

interface Props{
  film: Film
}

const FilmOverview:FC<Props> = ({film}) => {
  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{film.rating.toFixed(1)}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{convertRating(film.rating)}</span>
          <span className="movie-rating__count">{`${film.scoresCount} ratings`}</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{film.description}</p>
        <p className="movie-card__director"><strong>{`Director: ${film.director}`}</strong></p>
        <p className="movie-card__starring"><strong>{`Starring: ${film.starring.join(`, `)} and other`}</strong></p>
      </div>
    </>
  );
};
export default FilmOverview;
