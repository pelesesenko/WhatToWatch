import React, {FC} from 'react';
import Film from 'src/types/film';
import FilmCard from '../film-card/film-card'

interface Props {
  ids: number[],
};

const FilmCardList:FC<Props> = ({ids}) => {

  return (<div className="catalog__movies-list">
            {ids.map((id) => <FilmCard id={id} key={id} />)}
          </div>
  )
};

export default FilmCardList;
