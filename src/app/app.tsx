import React, {FC, Suspense} from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppPaths} from '../constants';
import browserHistory from '../browser-history';
import {fetchAuth} from '../store/user/actions';
import {useAppDispatch, useAppSelector} from '../store/store';
import {selectIsServerAvailable} from '../store/server/selectors';
import NotFound from '../components/pages/not-found/not-found';
import FilmsContainer from '../components/pages/films/films-container';
import ServerError from '../components/common/server-error/server-error';
import PrivateRoute from '../components/common/private-route/private-route';
import Preloader from '../components/common/preloader/preloader';
import './app.css';

const MyList = React.lazy(() => import(
    /* webpackChunkName: "my-list" */
    /* webpackMode: "lazy" */
    `../components/pages/my-list/my-list`));
const Login = React.lazy(() => import(
    /* webpackChunkName: "login" */
    /* webpackMode: "lazy" */
    `../components/pages/login/login`));
const AddReview = React.lazy(() => import(
    /* webpackChunkName: "add-review" */
    /* webpackMode: "lazy" */
    `../components/pages/add-review/add-review`));
const Player = React.lazy(() => import(
    /* webpackChunkName: "player" */
    /* webpackMode: "lazy" */
    `../components/pages/player/player`));

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isServerAvailable = useAppSelector(selectIsServerAvailable);

  React.useEffect(() =>{
    dispatch(fetchAuth());
  }, []);

  return (
    <BrowserRouter history={browserHistory}>
      {!isServerAvailable && <ServerError />}
      <Suspense fallback={<Preloader/>}>
        <Switch>
          <PrivateRoute path={AppPaths.MY_LIST} exact render={()=> <MyList />} />
          <PrivateRoute path={AppPaths.ADD_REVIEW} exact render={()=> <AddReview />} />
          <Route path={AppPaths.LOGIN} exact component={Login} />
          <Route path={AppPaths.PLAYER} exact component={Player} />
          <Route path={AppPaths.NOT_FOUND} exact component={NotFound} />
          <Route path={AppPaths.MAIN} component={FilmsContainer} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
