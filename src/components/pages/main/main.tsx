import React, {FC} from 'react';
import Header from '../../common/header/header';
import {Pages} from '../../../constants';
import Footer from '../../common/footer';
import FilmCardList from '../../common/film-card-list/film-card-list';
import { useDispatch, useSelector } from 'react-redux';
// import { AppStateType } from '../../../store/store';
import { selectIsCatalogLoaded, selectFilmIdsByGenre, selectAllFilmIds } from '../../../store/selectors';
import {ActionCreators as FilmsActionCreators} from '../../../store/redusers/main/catalog'
import { mockFilms } from '../../../store/redusers/mock';
import FilmCatalog from './film-catalog';


const Main:FC = () => {

  const dispatch = useDispatch();
  const isCatalogLoaded = useSelector((selectIsCatalogLoaded));

  if (!isCatalogLoaded) {
    dispatch(FilmsActionCreators.filmsLoaded(mockFilms))
  }

  const allFilmIds = useSelector((selectAllFilmIds));
  const filmIdsByGenre = useSelector((selectFilmIdsByGenre));


  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header page={Pages.MAIN} />
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width={218} height={327} />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <FilmCatalog filmIdsByGenre={filmIdsByGenre} allFilmIds={allFilmIds} />
        <Footer />
      </div>
    </>
  );
};

export default Main;
