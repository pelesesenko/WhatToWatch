import React, {FC} from 'react';
import {LoadingStatuses, Pages} from '../../../constants';
import {fetchFavFilms, selectFavFilmsIds, selectFavFilmsStatus} from '../../../store/slices/fav-films-slice';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FilmCardList from '../../common/film-card-list/film-card-list';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import Preloader from '../../common/preloader/preloader';
import styles from './my-list.module.css';

const MyList:FC = () => {

  const loadingStatus = useAppSelector(selectFavFilmsStatus);
  const ids = useAppSelector(selectFavFilmsIds);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (loadingStatus === LoadingStatuses.idle) {
      dispatch(fetchFavFilms());
    }
  }, [loadingStatus]);

  return (
    <div className="user-page">
      <Header page={Pages.MY_LIST} />
      <section className={`catalog ${styles.catalog}`}>
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {loadingStatus === LoadingStatuses.fulfilled
          ? <FilmCardList ids={ids}/>
          : <Preloader />
        }
      </section>
      <Footer />
    </div>
  );
};

export default MyList;
