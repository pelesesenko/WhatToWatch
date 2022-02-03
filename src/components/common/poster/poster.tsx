import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths} from '../../../constants';
import Film from '../../../types/film';
import {addIdParam} from '../../../utils';

interface Props {
  film: Film;
  withLink?: true;
  mod? : `big` | `small`;
}

const Poster:FC<Props> = ({film, withLink, mod}) => {

  const extraClass = mod ? ` movie-card__poster--` + mod : ``;

  const img = <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />;

  const child = withLink ? <Link to={addIdParam(AppPaths.FILM, film.id)}>{img}</Link> : img;

  return (
    <div className={`movie-card__poster` + extraClass}>
      {child}
    </div>
  );
};

export default Poster;
