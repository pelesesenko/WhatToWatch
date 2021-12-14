import React, {FC} from 'react';
import Film from '../../../../types/film';
import { formatRunTime } from '../../../../utilites';
import { FilmDetailsTitles } from '../../../../constants';
import FilmDetailsSection from './film-details-section';

interface Props{
  film: Film
}

const FilmDetails:FC<Props> = ({film}) => {
  const formattedStarring = film.starring.map((name, i, arr) => (
    i < arr.length - 1 ? <>{name},<br/></> : name
  ));

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
