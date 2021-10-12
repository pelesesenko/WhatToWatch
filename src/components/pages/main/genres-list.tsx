import React, {FC} from 'react';

interface Props {
  genres: string[],
  currentGenre: string | null
};
const GenresList:FC<Props> = ({genres, currentGenre}) => {
  return (
   <ul className="catalog__genres-list">
      <li className={`catalog__genres-item${!currentGenre ? ' catalog__genres-item--active' : ''}`}>
        <a href="#" className="catalog__genres-link">All genres</a>
      </li>
      {genres.map((genre) => (
        <li className={`catalog__genres-item${currentGenre === genre ? ' catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};
export default GenresList;
