import {AxiosError} from 'axios';
import {AppPaths} from '../constants';
import {authorizationDenied, serverAvailabilityChecked} from './extra-actions';
import {AppDispatch} from './store';
import history from '../browser-history';

export const handleSuccess = (dispatch: AppDispatch): void => {
  dispatch(serverAvailabilityChecked(true));
};

export const HttpErrorStatuses = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404
} as const;

export const handleError = (err : AxiosError, dispatch: AppDispatch): void => {

  const {response, request} = err;

  if (response && response.status === HttpErrorStatuses.unauthorized) {
    dispatch(authorizationDenied());
  }
  if (response && response.status === HttpErrorStatuses.notFound) {
    history.push(AppPaths.NOT_FOUND);
  }
  if (response && response.status >= 500 || !response && request) {
    dispatch(serverAvailabilityChecked(false));
    setTimeout(() => dispatch(serverAvailabilityChecked(true)), 5000);
  }
};
