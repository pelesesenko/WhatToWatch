import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths} from '../../../constants';
import Film from '../../../types/film';
import {addIdParam} from '../../../utils';

interface Props {
  film: Film;
  withLink?: true;
  mode? : 'big' | 'small';
}

const Poster:FC<Props> = ({film, withLink, mode}) => {

  const modifier = mode ? ` movie-card__poster--${mode}` : '';

  const img = <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />;

  const child = withLink ? <Link to={addIdParam(AppPaths.FILM, film.id)}>{img}</Link> : img;

  return (
    <div className={`movie-card__poster${modifier}`}>
      {child}
    </div>
  );
};

export default Poster;
