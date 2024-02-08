import axios, {AxiosResponse} from 'axios';
import {adaptSnakeToCamel} from '../utils';

const BACKEND_URL = 'https://6.react.htmlacademy.pro/wtw';
const TIMEOUT = 5000;

const httpClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
  withCredentials: true
});

const onSuccess = (response: AxiosResponse<unknown>) => {
  response.data = adaptSnakeToCamel(response.data);
  return response;
};

httpClient.interceptors.response.use(onSuccess);

export default httpClient;
