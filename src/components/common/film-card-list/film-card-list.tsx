import React, {FC} from 'react';
import FilmCard from '../film-card/film-card';

interface Props {
  ids: number[],
}

const FilmCardList:FC<Props> = ({ids}) => (
  <div className="catalog__movies-list">
    {ids.map((id) => <FilmCard id={id} key={id} />)}
  </div>
);

export default FilmCardList;
