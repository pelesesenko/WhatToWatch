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
import { useAppDispatch } from '../store/store';

const App: FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() =>{
    dispatch(fetchAuth())
  }, []);

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppPaths.LOGIN} exact render={()=> <Login />}/>
        <Route path={AppPaths.MY_LIST} exact render={()=> <MyList />}/>
        <Route path={AppPaths.PLAYER} exact render={()=> <Player />}/>
        <Route path={AppPaths.ADD_REVIEW} exact component={AddReview}/>
        <Route path={AppPaths.NOT_FOUND} exact render={()=> <NotFound />}/>
        <Route path={AppPaths.MAIN} component={FilmsContainer}/>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )};

export default App;
