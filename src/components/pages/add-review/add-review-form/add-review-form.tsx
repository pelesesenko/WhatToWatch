import React, {FC, Fragment} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {postFilmReview} from '../../../../store/film-info/actions';
import {useAppDispatch} from '../../../../store/store';

interface Review {
  rating: number;
  comment: string;
}

interface Props {
  id: number;
}

const AddReviewForm:FC<Props> = ({id}) => {

  const dispatch = useAppDispatch();

  const {register, handleSubmit, formState: {errors}} = useForm<Review>();

  const onSubmit: SubmitHandler<Review> = (review) => {
    dispatch(postFilmReview({id, review}));
  };

  return (
    <form className="add-review__form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rating">
        {errors.rating && <i style={{color: `red`}}>Please select a rating</i>}
        <div className="rating__stars">
          {Array(11).fill(true).map((_, i) => (
            <Fragment key={i} >
              <input className="rating__input" id={`star-${i}`} type="radio"
                {...register(`rating`, {min: 1})}
                value={i} defaultChecked={i === 0}/>
              <label className="rating__label" htmlFor={`star-${i}`}
                style={{display: `${i === 0 ? `none` : ``}`}}>{`Rating ${i}`}
              </label>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="add-review__text">
        {errors.comment && <i style={{color: `red`}}>Your comment must be 50 - 400 characters long</i>}
        <textarea className="add-review__textarea" id="review-text" placeholder="Review text"
          {...register(`comment`, {minLength: 50, maxLength: 400, required: true})}
          defaultValue={``} />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default AddReviewForm;
