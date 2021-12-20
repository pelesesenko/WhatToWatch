import React, {FC} from 'react';
import Header from '../../common/header/header';
import {LoadingStatuses, Pages} from '../../../constants';
import Footer from '../../common/footer';
import FilmCardList from '../../common/film-card-list/film-card-list';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchFavFilms, selectFavFilmsIds, selectFavFilmsStatus } from '../../../store/slices/fav-films-slice';

const MyList:FC = () => {
  const loadingStatus = useAppSelector(selectFavFilmsStatus);
  const ids = useAppSelector(selectFavFilmsIds);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if(loadingStatus === LoadingStatuses.idle) {
      dispatch(fetchFavFilms());
    }
  }, [loadingStatus]);
  return (
    <>
      <div className="user-page">
        <Header page={Pages.MY_LIST} />
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {loadingStatus === LoadingStatuses.pending
            ? <h1>Loading...</h1>
            : <FilmCardList ids={ids}/> }
        </section>
        <Footer />
      </div>
    </>
  );
};
export default MyList;
