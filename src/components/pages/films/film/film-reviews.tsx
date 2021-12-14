import React, {FC} from 'react';
import { fetchFilmReviews, selectFilmReviews } from '../../../../store/slices/film-info-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { ReviewGet } from '../../../../types/review';
import Film from '../../../../types/film';
import FilmReview from './film-review';

interface Props{
  reviews: ReviewGet[]
}


const FilmReviews:FC<Props> = ({reviews}) => {

  reviews = reviews.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  return (
    <>
      {!reviews.length
        ? <i>There are no comments yet</i>
        : <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {reviews.slice(0, 3).map((review) => (
                <FilmReview review={review} key={review.id} />
              ))}
            </div>
            <div className="movie-card__reviews-col">
              {reviews.slice(3, 6).map((review) => (
                <FilmReview review={review} key={review.id} />
              ))}
            </div>
          </div>}
    </>
  );
};
export default FilmReviews;
