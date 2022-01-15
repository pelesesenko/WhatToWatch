import React, {FC} from 'react';
import Header from '../../common/header/header';
import {AppPaths, AuthorizationStatuses, LoadingStatuses, Pages} from '../../../constants';
import Footer from '../../common/footer/footer';
import FilmCardList from '../../common/film-card-list/film-card-list';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchFavFilms, selectFavFilmsIds, selectFavFilmsStatus} from '../../../store/slices/fav-films-slice';
import {selectAuthStatus} from '../../../store/slices/user-slice';
import {Redirect} from 'react-router-dom';
import Preloader from '../../common/preloader/preloader';
import styles from './my-list.module.css';
import history from '../../../browser-history'

const MyList:FC = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const loadingStatus = useAppSelector(selectFavFilmsStatus);
  const ids = useAppSelector(selectFavFilmsIds);
  const dispatch = useAppDispatch();

  if (authStatus === AuthorizationStatuses.notAuthorized) history.push(AppPaths.LOGIN);//??

  React.useEffect(() => {
    if (loadingStatus === LoadingStatuses.idle) {
      dispatch(fetchFavFilms());
    }
  }, [loadingStatus]);



  return (
    <>
      <div className="user-page">
        <Header page={Pages.MY_LIST} />
        <section className={`catalog ${styles.catalog}`}>
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {loadingStatus === LoadingStatuses.pending
            ? <Preloader />
            : <FilmCardList ids={ids}/> }
        </section>
        <Footer />
      </div>
    </>
  );
};
export default MyList;
