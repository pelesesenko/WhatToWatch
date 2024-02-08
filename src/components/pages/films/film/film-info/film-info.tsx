import React, {FC} from 'react';
import {FilmInfoTabs} from '../../../../../constants';
import {selectFilmCurrentTab} from '../../../../../store/film-info/selectors';
import {useAppSelector} from '../../../../../store/store';
import Film from '../../../../../types/film';
import Poster from '../../../../common/poster/poster';
import FilmDetails from '../film-details/film-details';
import FilmInfoMenu from '../film-info-menu/film-info-menu';
import FilmOverview from '../film-overview/film-overview';
import FilmReviewsContainer from '../film-reviews-container/film-reviews-container';

interface Props {
  film: Film
}

const FilmInfo:FC<Props> = ({film}) => {

  const currentInfoTab = useAppSelector(selectFilmCurrentTab);

  const Tabs = {
    [FilmInfoTabs.overview]: <FilmOverview film={film} />,
    [FilmInfoTabs.details]: <FilmDetails film={film} />,
    [FilmInfoTabs.reviews]: <FilmReviewsContainer id={film.id} bgColor={film.backgroundColor}/>,
  } as const;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <Poster film={film} mode={'big'} />
        <div className="movie-card__desc">
          <FilmInfoMenu current={currentInfoTab} />
          {Tabs[currentInfoTab]}
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
