import React, {FC} from 'react';
import FilmCardList from '../../../../common/film-card-list/film-card-list';
import GenresList from '../genres-list/genres-list';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {selectIdsByGenre, selectFilmsCurrentGenre, selectFilmsCatalogSize, incrementCatalogSize, selectFilmsLoadingStatus} from '../../../../../store/slices/films-slice';
import {LoadingStatuses} from '../../../../../constants';
import Preloader from '../../../../common/preloader/preloader';


const MainCatalog:FC = () => {

  const dispatch = useAppDispatch();
  const listSize = useAppSelector(selectFilmsCatalogSize);
  const filmsLoadingStatus = useAppSelector(selectFilmsLoadingStatus);
  const currentGenre = useAppSelector(selectFilmsCurrentGenre);
  const ids = useAppSelector((state) => selectIdsByGenre(state, currentGenre));

  const inListIds = ids.slice(0, listSize);
  const buttonHidden = (ids <= inListIds);

  if (filmsLoadingStatus !== LoadingStatuses.fulfilled) {
    return <Preloader />;
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList currentGenre={currentGenre} />
      <FilmCardList ids={inListIds} />
      <div className="catalog__more">
        <button className="catalog__button" type="button"
          style={buttonHidden ? {display: `none`} : {}}
          onClick={() => dispatch(incrementCatalogSize())}
        >
          Show more
        </button>
      </div>
    </section>
  );
};

export default MainCatalog;
