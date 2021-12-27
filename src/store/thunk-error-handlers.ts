import { AxiosError } from 'axios';
import { HttpErrorStatuses } from '../constants';
import { authorizationDenied, serverAvailabilityChecked } from './extra-actions';
import { AppDispatch } from './store';

export const handleSuccess = (dispatch: AppDispatch) => {
  dispatch(serverAvailabilityChecked(true));
}

export const handleError = (err : AxiosError, dispatch: AppDispatch) => {

  const {response} = err;

  if (response && response.status === HttpErrorStatuses.unauthorized) {
    dispatch(authorizationDenied());
  }
  if (response && response.status >= 500) {
    dispatch(serverAvailabilityChecked(false));
    setTimeout(() => dispatch(serverAvailabilityChecked(true)), 5000);
  }
}
