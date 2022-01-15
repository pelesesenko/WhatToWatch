import React, {FC} from 'react';
import {fetchFilmReviews, selectFilmReviews} from '../../../../../store/slices/film-info-slice';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import Preloader from '../../../../common/preloader/preloader';
import FilmReviews from '../film-reviews/film-reviews';

interface Props {
  id: number;
  backgroundColor: string;
}
const FilmReviewsContainer:FC<Props> = ({id, backgroundColor}) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => selectFilmReviews(state, id));

  React.useEffect(() => {
    if (reviews === undefined) {
      dispatch(fetchFilmReviews(id));
    }
  }, [id]);

  return (
    <>
      {reviews === undefined
        ? <Preloader backgroundColor={backgroundColor}/>
        : <FilmReviews reviews={reviews.slice(0, 6)} />
      }
    </>
  );
};
export default FilmReviewsContainer;
