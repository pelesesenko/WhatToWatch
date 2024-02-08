import React, {FC, Fragment} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormErrorMessages} from '../../../../constants';
import {postFilmReview} from '../../../../store/film-info/actions';
import {useAppDispatch} from '../../../../store/store';
import {createFormError} from '../../../../utils';

interface Review {
  rating: number;
  comment: string;
}

interface Props {
  id: number;
}

const stars = Array(11).fill(true);

const AddReviewForm:FC<Props> = ({id}) => {

  const dispatch = useAppDispatch();

  const {register, handleSubmit, formState: {errors}} = useForm<Review>();

  const onSubmit: SubmitHandler<Review> = (review) => {
    dispatch(postFilmReview({id, review}));
  };

  return (
    <form className="add-review__form"
      role='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rating">
        {errors.rating && createFormError(FormErrorMessages.rating)}
        <div className="rating__stars">
          {stars.map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i} >
              <input className="rating__input"
                type="radio"
                id={`star-${i}`}
                value={i}
                defaultChecked={i === 0}
                {...register('rating', {min: 1})}
              />
              <label className="rating__label"
                htmlFor={`star-${i}`}
                style={{display: `${i === 0 ? 'none' : ''}`}}
              >
                {`Rating ${i}`}
              </label>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="add-review__text">
        {errors.comment && createFormError(FormErrorMessages.comment)}
        <textarea className="add-review__textarea"
          id="review-text"
          placeholder="Review text"
          defaultValue={''}
          {...register('comment', {minLength: 50, maxLength: 400, required: true})}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default AddReviewForm;
