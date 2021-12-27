import React, {FC} from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { AppPaths, AuthorizationStatuses } from '../../../constants';
import { selectAuthStatus } from '../../../store/slices/user-slice';
import { useAppSelector } from '../../../store/store';
import Preloader from '../preloader/preloader';

interface IRender {
  render: Exclude<RouteProps['render'], undefined> //Pick<Required<RouteProps>, 'render'>
}


const PrivateRoute:FC<RouteProps & IRender> = ({render, ...rest}) => {

  const authStatus = useAppSelector(selectAuthStatus);

  return (
    <Route {...rest}
    render={(routeProps) => {

      if(!authStatus) return <Preloader />

      if(authStatus === AuthorizationStatuses.notAuthorized) {
        return <Redirect to={AppPaths.LOGIN}/>
      }

      return render(routeProps);
    }}
    />
  );
};
export default PrivateRoute;
