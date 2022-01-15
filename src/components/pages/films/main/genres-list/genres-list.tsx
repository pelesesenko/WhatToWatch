import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {selectGenres, genreChanged} from '../../../../../store/slices/films-slice';
import {GENERAL_CATALOG_TAB, MAX_GENRES_NUMBER} from '../../../../../constants';

interface Props{
  currentGenre: string;
}
const GenresList:FC<Props> = ({currentGenre}) => {

  const genres = useAppSelector(selectGenres).slice(0, MAX_GENRES_NUMBER);
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {[GENERAL_CATALOG_TAB, ...genres].map((genre) => (
        <li
          onClick={() => dispatch(genreChanged(genre))}
          key={genre}
          className={`catalog__genres-item${currentGenre === genre ? ` catalog__genres-item--active` : ``}`}
          style={{cursor: 'pointer'}}>
          <a className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};
export default GenresList;
