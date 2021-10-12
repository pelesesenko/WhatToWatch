import React, {FC} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppPaths} from '../constants';
import Main from '../components/pages/main/main';
import AddReview from '../components/pages/add-review/add-review';
import Film from '../components/pages/film/film';
import Login from '../components/pages/login/login';
import MyList from '../components/pages/my-list/my-list';
import NotFound from '../components/pages/not-found/not-found';
import Player from '../components/pages/player/player';

const App: FC = () => (

  <BrowserRouter>
    <Switch>
      <Route path={AppPaths.FILM} exact render={()=> <Film />}/>
      <Route path={AppPaths.MAIN} exact render={()=> <Main />}/>
      <Route path={AppPaths.LOGIN} exact render={()=> <Login />}/>
      <Route path={AppPaths.MY_LIST} exact render={()=> <MyList />}/>
      <Route path={AppPaths.PLAYER} exact render={()=> <Player />}/>
      <Route path={AppPaths.ADD_REVIEW} exact render={()=> <AddReview />}/>
      <Route path={AppPaths.NOT_FOUND} exact render={()=> <NotFound />}/>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
