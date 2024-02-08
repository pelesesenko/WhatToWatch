import React, {FC} from 'react';
import Film from '../../../../../types/film';
import {formatStarring, formatRunTime} from '../../../../../utils';
import {FilmDetailsTitles} from '../../../../../constants';
import FilmDetailsSection from '../film-details-section/film-details-section';

interface Props{
  film: Film
}

const FilmDetails:FC<Props> = ({film}) => {

  const formattedStarring = formatStarring(film);

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <FilmDetailsSection title={FilmDetailsTitles.director} value={film.director} />
        <FilmDetailsSection title={FilmDetailsTitles.starring} value={formattedStarring} />
      </div>
      <div className="movie-card__text-col">
        <FilmDetailsSection title={FilmDetailsTitles.runtime} value={formatRunTime(film.runTime)} />
        <FilmDetailsSection title={FilmDetailsTitles.genre} value={film.genre} />
        <FilmDetailsSection title={FilmDetailsTitles.released} value={String(film.released)} />
      </div>
    </div>
  );
};

export default FilmDetails;
