import React, {FC} from 'react';
import Header from '../../../common/header/header';
import {AppPaths, AuthorizationStatuses, Pages} from '../../../../constants';
import {useAppSelector} from '../../../../store/store';
import {selectAuthStatus} from '../../../../store/slices/user-slice';
import AddReviewForm from '../add-review-form/add-review-form';
import useLoadFilmById from '../../../../hooks/load-film-by-id';
import Preloader from '../../../common/preloader/preloader';
import history from '../../../../browser-history';

const AddReview:FC = () => {

  const authStatus = useAppSelector(selectAuthStatus);
  if (authStatus === AuthorizationStatuses.notAuthorized) {
    history.push(AppPaths.LOGIN);
  }

  const [id, film] = useLoadFilmById(false);

  return (
    <>
      {!film
        ?
        <Preloader />
        :
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <Header page={Pages.ADD_REVIEW} film={film} />
            <div className="movie-card__poster movie-card__poster--small">
              <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />
            </div>
          </div>
          <div className="add-review">
            <AddReviewForm id={id} />
          </div>
        </section>}
    </>
  );
};
export default AddReview;
