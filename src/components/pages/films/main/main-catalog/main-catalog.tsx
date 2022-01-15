import React, {FC} from 'react';
import FilmCardList from '../../../../common/film-card-list/film-card-list';
import GenresList from '../genres-list/genres-list';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {selectIdsByGenre, selectFilmsCurrentGenre, selectFilmsCatalogSize, incrementCatalogSize} from '../../../../../store/slices/films-slice';


const MainCatalog:FC = () => {
  const dispatch = useAppDispatch();
  const listSize = useAppSelector(selectFilmsCatalogSize);
  const currentGenre = useAppSelector(selectFilmsCurrentGenre);
  const ids = useAppSelector((state) => selectIdsByGenre(state, currentGenre));
  const inListIds = ids.slice(0, listSize);
  const buttonHidden = (ids <= inListIds);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList currentGenre={currentGenre} />
      <FilmCardList ids={inListIds} />
      <div className="catalog__more">
        <button onClick={() => dispatch(incrementCatalogSize())}
          style={buttonHidden ? {display: `none`} : {}}
          className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
};

export default MainCatalog;
