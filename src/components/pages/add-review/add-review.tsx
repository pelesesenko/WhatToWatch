import React, {FC, Fragment} from 'react';
import Header from '../../common/header/header';
import {AppPaths, Pages} from '../../../constants';
import { useParams } from 'react-router-dom';
import { checkIdParam } from '../../../utilites';
import history from '../../../browser-history';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchFilmById, selectFilmById } from '../../../store/slices/films-slice';
import {SubmitHandler, useForm} from 'react-hook-form';
import { postFilmReview } from '../../../store/slices/film-info-slice';

interface UrlParams {
  id: string;
}

interface Inputs {
  rating: number;
  comment: string;
}

const AddReview:FC = () => {

  const dispatch = useAppDispatch();
  const {id: param} = useParams<UrlParams>();

  if(!checkIdParam(param)) history.push(AppPaths.NOT_FOUND);

  const id = +param;
  const film = useAppSelector((state) => selectFilmById(state, id));

  React.useEffect(() => {
    if(film === undefined) {
      dispatch(fetchFilmById(id))
    }
  }, [film, id]);

  const {register, handleSubmit, formState : {errors}} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (review) => {
    dispatch(postFilmReview({id, review}));
  }

  return (
    <>
      {!film
        ? <h1>Loading...</h1>
        :
          <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <Header page={Pages.ADD_REVIEW} filmName={film.name} />
            <div className="movie-card__poster movie-card__poster--small">
              <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />
            </div>
          </div>
          <div className="add-review">
            <form onSubmit={handleSubmit(onSubmit)} className="add-review__form">
              <div className="rating">
                {errors.rating && <i style={{color: 'red'}}>Please select a rating</i>}
                <div className="rating__stars">
                  {Array(11).fill(true).map((_, i) => (
                    <Fragment key={i} >
                      <input className="rating__input" id={`star-${i}`} type="radio"
                        {...register('rating', {min: 1})}
                        value={i} defaultChecked={i === 0}/>
                      <label className="rating__label" htmlFor={`star-${i}`}
                        style={{display: `${i === 0 ? 'none' : ''}`}}>{`Rating ${i}`}
                      </label>
                    </Fragment>
                  ))}
                </div>

              </div>
              <div className="add-review__text">
                {errors.comment && <i style={{color: 'red'}}>Your comment must be 50 - 400 characters long</i>}
                <textarea className="add-review__textarea" id="review-text" placeholder="Review text"
                  {...register('comment', {minLength: 50, maxLength: 400, required: true})}
                  defaultValue={``} />
                <div className="add-review__submit">
                  <button className="add-review__btn" type="submit">Post</button>
                </div>
              </div>
            </form>
          </div>
        </section>}
    </>
  );
};
export default AddReview;
