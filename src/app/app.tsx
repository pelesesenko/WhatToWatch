import React, {FC} from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppPaths} from '../constants';
import Login from '../components/pages/login/login';
import MyList from '../components/pages/my-list/my-list';
import Player from '../components/pages/player/player';
import AddReview from '../components/pages/add-review/add-review';
import NotFound from '../components/pages/not-found/not-found';
import FilmsContainer from '../components/pages/films/films-container';
import browserHistory from '../browser-history';
import { fetchAuth } from '../store/slices/user-slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectIsServerAvailable } from '../store/slices/server-slice';
import ServerError from '../components/common/server-error';
import PrivateRoute from '../components/common/private-route/private-route';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isServerAvailable = useAppSelector(selectIsServerAvailable)

  React.useEffect(() =>{
    dispatch(fetchAuth())
  }, []);

  return (
    <BrowserRouter history={browserHistory}>
      {!isServerAvailable && <ServerError />}
      <Switch>
        <PrivateRoute path={AppPaths.MY_LIST} exact render={()=> <MyList />}/>
        <PrivateRoute path={AppPaths.ADD_REVIEW} exact render={()=> <AddReview />} />
        <Route path={AppPaths.LOGIN} exact render={()=> <Login />}/>
        <Route path={AppPaths.PLAYER} exact render={()=> <Player />}/>
        <Route path={AppPaths.NOT_FOUND} exact render={()=> <NotFound />}/>
        <Route path={AppPaths.MAIN} component={FilmsContainer} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )};

export default App;
