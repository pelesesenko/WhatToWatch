import React, {FC, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import {AppPaths, LoadingStatuses} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchFilms} from '../../../store/films/actions';
import Main from './main/main';
const WitExtractIdFilm = React.lazy(() => import('./film/film'));
import Preloader from '../../common/preloader/preloader';
import {selectFilmsLoadingStatus} from '../../../store/films/selectors';

const FilmsContainer:FC = () => {

  const LoadingStatus = useAppSelector(selectFilmsLoadingStatus);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (LoadingStatus === LoadingStatuses.idle) {
      dispatch(fetchFilms());
    }
  }, [LoadingStatus]);

  return (
    <Suspense fallback={<Preloader/>}>
      <Switch>
        <Route path={AppPaths.FILM} exact component={WitExtractIdFilm} />
        <Route path={AppPaths.MAIN} component={Main} />
      </Switch>
    </Suspense>
  );
};

export default FilmsContainer;
