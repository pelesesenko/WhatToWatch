import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Film from 'src/types/film';
import { AppPaths } from '../../../constants';
import { selectFilmById } from '../../../store/slices/films-slice';
import { useAppSelector } from '../../../store/store';
import {makeLink} from '../../../utilites';
//import { selectFilmById } from '../../../store/selectors';
//import { AppStateType } from '../../../store/store';

interface Props {
  id: number,
};

const FilmCard:FC<Props> = ({id}) => {
  const film = useAppSelector((state) => selectFilmById(state, id));

  return (
    <>
      {!film ? <h1>Loading...</h1>
        :
        <article className="small-movie-card catalog__movies-card">
          <Link to={makeLink(AppPaths.FILM, film.id)}>
            <div className="small-movie-card__image">
                <img src={film.previewImage} alt={film.name} width={280} height={175} />
            </div>
          </Link>
          <h3 className="small-movie-card__title">
            <Link className="small-movie-card__link" to={makeLink(AppPaths.FILM, film.id)}>{film.name}</Link>
          </h3>
        </article>}
    </>
  )
};

export default FilmCard;
