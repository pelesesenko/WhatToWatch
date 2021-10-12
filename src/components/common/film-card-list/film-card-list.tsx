import React, {FC} from 'react';
import Film from 'src/types/film';
import FilmCard from '../film-card/film-card'

interface Props {
  filmIds: number[],
};

const FilmCardList:FC<Props> = ({filmIds}) => {
  return (<div className="catalog__movies-list">
            {filmIds.map((id) => <FilmCard id={id} key={id} />)}
          </div>
  )
};

export default FilmCardList;
