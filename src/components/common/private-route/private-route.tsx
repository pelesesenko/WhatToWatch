import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import {selectAuthStatus} from '../../../store/user/selectors';
import {useAppSelector} from '../../../store/store';
import Preloader from '../preloader/preloader';
import {loginBackUrl} from '../../../services/session-storage';

interface IRender {
  render: Exclude<RouteProps['render'], undefined>; // Pick<Required<RouteProps>, 'render'>
}

const PrivateRoute:FC<RouteProps & IRender> = ({render, ...rest}) => {

  const authStatus = useAppSelector(selectAuthStatus);

  if (!authStatus) {
    return <Preloader />;
  }

  if (authStatus === AuthorizationStatuses.notAuthorized) {
    loginBackUrl.set();
    return <Redirect to={AppPaths.LOGIN} />;
  }

  return (
    <Route {...rest}
      render={(routeProps) => render(routeProps)}
    />
  );
};

export default PrivateRoute;
