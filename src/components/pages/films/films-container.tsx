import React, {FC} from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './main/main/main';
import Film from './film/film/film';
import {AppPaths, LoadingStatuses} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchFilms, selectFilmsLoadingStatus} from '../../../store/slices/films-slice';

const FilmsContainer:FC = () => {
  const LoadingStatus = useAppSelector(selectFilmsLoadingStatus);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (LoadingStatus === LoadingStatuses.idle) {
      dispatch(fetchFilms());
    }

  }, []);
  return (
    <Switch>
      <Route path={AppPaths.FILM} exact component={Film}/>
      <Route path={AppPaths.MAIN} component={Main}/>
    </Switch>
  );
};
export default FilmsContainer;
