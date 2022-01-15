import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths, Pages} from '../../../../../constants';
import {selectFilmById} from '../../../../../store/slices/films-slice';
import {useAppSelector} from '../../../../../store/store';
import Film from '../../../../../types/film';
import {makeLink} from '../../../../../utilites';
import Header from '../../../../common/header/header';
import MovieButtons from '../../../../common/movie-buttons/movie-buttons';
interface Props{
  promoId: number
}
const MainHeader:FC<Props> = ({promoId}) => {

  const promoFilm = useAppSelector((state) => selectFilmById(state, promoId)) as Film;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header page={Pages.MAIN} />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <Link to={makeLink(AppPaths.FILM, promoFilm.id)}>
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width={218} height={327} />
            </Link>
          </div>
          <div className="movie-card__desc">
            <Link to={makeLink(AppPaths.FILM, promoFilm.id)} style={{color: `inherit`, textDecoration: `none`}} >
              <h2 className="movie-card__title">{promoFilm.name}</h2>
            </Link>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoFilm.genre}</span>
              <span className="movie-card__year">{promoFilm.released}</span>
            </p>
            <div className="movie-card__buttons">
              <MovieButtons id={promoFilm.id} favStatus={promoFilm.isFavorite} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainHeader;
