import React, {FC} from 'react';
import {LoadingStatuses} from '../../../../constants';
import withExtractIdParam from '../../../../hocs/withExtractIdParam';
import useLoadFilmById from '../../../../hooks/load-film-by-id';
import {selectFilmIdsSameGenre, selectFilmsLoadingStatus} from '../../../../store/films/selectors';
import {useAppSelector} from '../../../../store/store';
import FilmCardList from '../../../common/film-card-list/film-card-list';
import Footer from '../../../common/footer/footer';
import Preloader from '../../../common/preloader/preloader';
import FilmContent from './film-content/film-content';

interface Props {
  id: number;
}

const Film:FC<Props> = ({id}) => {

  const film = useLoadFilmById(id, true);
  const alikeFilmIds = useAppSelector((state) => selectFilmIdsSameGenre(state, id));
  const filmsLoadingStatus = useAppSelector(selectFilmsLoadingStatus);

  return (
    <>
      {film
        ? <FilmContent film={film} />
        : <Preloader />
      }
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {film && (filmsLoadingStatus === LoadingStatuses.fulfilled)
            ? <FilmCardList ids={alikeFilmIds} />
            : <Preloader />}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default withExtractIdParam(Film);
