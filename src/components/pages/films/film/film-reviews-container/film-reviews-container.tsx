import React, {FC} from 'react';
import {fetchFilmReviews} from '../../../../../store/film-info/actions';
import {selectFilmReviews} from '../../../../../store/film-info/selectors';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import Preloader from '../../../../common/preloader/preloader';
import FilmReviews from '../film-reviews/film-reviews';

interface Props {
  id: number;
  bgColor: string;
}
const FilmReviewsContainer:FC<Props> = ({id, bgColor}) => {

  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => selectFilmReviews(state, id));

  React.useEffect(() => {
    if (!reviews) {
      dispatch(fetchFilmReviews(id));
    }
  }, [id, reviews]);

  const result = !reviews
    ? <Preloader backgroundColor={bgColor}/>
    : <FilmReviews reviews={reviews.slice(0, 6)} />;

  return result;
};

export default FilmReviewsContainer;
