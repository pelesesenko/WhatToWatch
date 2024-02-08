import React, {FC} from 'react';
import Header from '../../common/header/header';
import {Pages} from '../../../constants';
import AddReviewForm from './add-review-form/add-review-form';
import useLoadFilmById from '../../../hooks/load-film-by-id';
import Preloader from '../../common/preloader/preloader';
import Poster from '../../common/poster/poster';
import FilmBackImg from '../../common/film-back-img/film-back-img';
import withExtractIdParam from '../../../hocs/withExtractIdParam';

interface Props {
  id: number;
}
export const AddReview:FC<Props> = ({id}) => {

  const film = useLoadFilmById(id, false);

  if (!film) {
    return <Preloader/>;
  }

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <FilmBackImg film={film} />
        <h1 className="visually-hidden">WTW</h1>
        <Header page={Pages.ADD_REVIEW} film={film} />
        <Poster film={film} mode='small' />
      </div>
      <div className="add-review">
        <AddReviewForm id={id} />
      </div>
    </section>
  );
};

export default withExtractIdParam(AddReview);
