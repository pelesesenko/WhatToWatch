import React, {FC} from 'react';
import Film from '../../../types/film';

interface Props {
  film: Film;
}

const FilmBackImg:FC<Props> = ({film}) => (
  <div className="movie-card__bg">
    <img src={film.backgroundImage} alt={film.name} />
  </div>
);

export default FilmBackImg;
