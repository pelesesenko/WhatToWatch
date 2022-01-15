import React, {FC} from 'react';
import {FilmInfoTabs} from '../../../../../constants';
import {currentTabChanged, selectFilmCurrentTab} from '../../../../../store/slices/film-info-slice';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import Film from '../../../../../types/film';
import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmReviewsContainer from '../film-reviews-container/film-reviews-container';

interface Props {
  film: Film
}

const FilmInfo:FC<Props> = ({film}) => {

  const dispatch = useAppDispatch();
  const currentInfoTab = useAppSelector(selectFilmCurrentTab);

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
              {FilmInfoTabs.map((tab) => (
                <li className={`movie-nav__item ${tab === currentInfoTab ? `movie-nav__item--active` : ``}`}
                  key={tab} >
                  <a onClick={() => dispatch(currentTabChanged(tab))}
                    style={{cursor: `pointer`}}
                    className="movie-nav__link">{tab}</a>
                </li>
              ))}
            </ul>
          </nav>
          {currentInfoTab === FilmInfoTabs[0] && <FilmOverview film={film} />}
          {currentInfoTab === FilmInfoTabs[1] && <FilmDetails film={film} />}
          {currentInfoTab === FilmInfoTabs[2]
           && <FilmReviewsContainer id={film.id} backgroundColor={film.backgroundColor}/>}
        </div>
      </div>
    </div>
  );
};
export default FilmInfo;
