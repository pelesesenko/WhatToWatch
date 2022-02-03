import React, {FC} from 'react';
import {FilmInfoTabs} from '../../../../../constants';
import {selectFilmCurrentTab} from '../../../../../store/slices/film-info-slice';
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

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <Poster film={film} mod={`big`} />
        <div className="movie-card__desc">
          <FilmInfoMenu current={currentInfoTab} />
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
