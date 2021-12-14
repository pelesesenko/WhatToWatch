import React, {FC} from 'react';
import { selectIdsByGenre } from '../../../../store/slices/films-slice';
import { useAppSelector } from '../../../../store/store';
import FilmCardList from '../../../common/film-card-list/film-card-list';

interface Props{
  genre: string
  id: number
}
const FilmsLikeThis:FC<Props> = ({genre, id}) => {
  const idsLikeThis = useAppSelector((state) => selectIdsByGenre(state, genre));
  const ids = idsLikeThis.slice(0, 5).filter((_id) => _id !== id).slice(0, 4);
  return (
    <FilmCardList ids={ids} />
  );
};
export default FilmsLikeThis;
