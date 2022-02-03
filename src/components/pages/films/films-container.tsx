import React, {FC, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import {AppPaths, LoadingStatuses} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchFilms, selectFilmsLoadingStatus} from '../../../store/slices/films-slice';
import Main from './main/main';
const Film = React.lazy(() => import(`./film/film`));
import Preloader from '../../common/preloader/preloader';

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
        <Route path={AppPaths.FILM} exact component={Film} />
        <Route path={AppPaths.MAIN} component={Main} />
      </Switch>
    </Suspense>
  );
};

export default FilmsContainer;
