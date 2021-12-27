import axios, { AxiosError, AxiosResponse } from 'axios';
import {snakeToCamelAdapter} from '../utilites';
import history from '../browser-history';
import { AppPaths, HttpErrorStatuses } from '../constants';

const BACKEND_URL = `https://6.react.pages.academy/wtw`;
const TIMEOUT = 5000;

const httpClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
  withCredentials: true
});

const onSuccess = (response: AxiosResponse<Object>) => {
  response.data = snakeToCamelAdapter(response.data);
  return response;
};

const onFail = (err: AxiosError) => {

  const {response} = err;

  if (response && response.status === HttpErrorStatuses.notFound) {
    history.push(AppPaths.NOT_FOUND);
    throw err;
  }
  throw err;
};

httpClient.interceptors.response.use(onSuccess, onFail);

export default httpClient;
