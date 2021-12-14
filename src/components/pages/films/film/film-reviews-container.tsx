import React, {FC} from 'react';
import { fetchFilmReviews, selectFilmReviews } from '../../../../store/slices/film-info-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import FilmReviews from './film-reviews';

interface Props {
  id: number
}
const FilmReviewsContainer:FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => selectFilmReviews(state, id));

  React.useEffect(() => {
    if(reviews === undefined) {
      dispatch(fetchFilmReviews(id));
    }
  },[id]);

  return (
    <>
      {reviews === undefined
        ? <h1>Loading...</h1>
        : <FilmReviews reviews={reviews.slice(0, 6)} />
      }
    </>
  );
};
export default FilmReviewsContainer;
