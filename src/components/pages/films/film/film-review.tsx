import React, {FC} from 'react';
import { ReviewGet } from '../../../../types/review';

interface Props {
  review: ReviewGet
}

const FilmReview:FC<Props> = ({review}) => {
  const {
    user :{
      name: userName
    },
    rating,
    comment,
    date: dateString,
  } = review;
  const date = new Date(dateString);
  const dateAttribute = date.toLocaleString(`en-CA`, {year: `numeric`, month: `2-digit`, day: `2-digit`});
  const dateText = date.toLocaleString(`en-CA`, {month: `long`, day: `2-digit`}) + ', ' +
        date.toLocaleString(`en-CA`, {year: `numeric`});
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime={dateAttribute}>{dateText}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{Math.round(rating).toFixed(1)}</div>
    </div>
  );
};
export default FilmReview;
