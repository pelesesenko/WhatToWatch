import {AxiosResponse} from 'axios';
import Film from '../types/film';
import {ReviewGet, ReviewPost} from '../types/review';
import {UserGet, UserPost} from '../types/user';
import client from './http-client';

const ServerEndpoints = {
  films: `/films`,
  favorite: `/favorite`,
  comments: `/comments`,
  login: `/login`,
  logout: `/logout`,
} as const;

type TServerEndpoints = typeof ServerEndpoints[keyof typeof ServerEndpoints];

class Api<T, D> {
  constructor(
    protected endpoint: TServerEndpoints
  ) {}

  protected injectParams(params: (string | number)[]) {
    return this.endpoint + `/` + params.join(`/`);
  }
  get() {
    return client.get<T[]>(this.endpoint);// , {onDownloadProgress: (e) => console.log(e)}
  }
  post(data: D) {
    return client.post<D, AxiosResponse<T>>(this.endpoint, data);
  }
}

class FilmsApi extends Api<Film, never> {
  getById(id: number) {
    return client.get<Film>(this.injectParams([id]));
  }
  getPromo() {
    return client.get<Film>(this.endpoint + `/promo`);
  }
}
class ReviewsApi extends Api<ReviewGet, ReviewPost> {
  postById(data: ReviewPost, id: number) {
    return client.post<ReviewPost, AxiosResponse<ReviewGet[]>>(this.injectParams([id]), data);
  }
  getById(id: number) {
    return client.get<ReviewGet[]>(this.injectParams([id]));
  }
}
class FavoriteApi extends Api<Film, never> {
  postByParams(id: number, status: boolean) {
    const params = [id, status ? 1 : 0];
    return client.post<never, AxiosResponse<Film>>(this.injectParams(params));
  }
}
class UserApi extends Api<UserGet, UserPost> {
  logout() {
    return client.get(ServerEndpoints.logout);
  }
  getUser() {
    return client.get<UserGet>(ServerEndpoints.login);
  }
}

type TFilmsApi = Omit<FilmsApi, `post`>
type TFavoriteApi = Omit<FavoriteApi, `post`>
type TReviewsApi = Omit<ReviewsApi, `get` | `post`>
type TUserApi = Omit<UserApi, `get`>

export const filmsApi: TFilmsApi = new FilmsApi(ServerEndpoints.films);
export const favoriteApi: TFavoriteApi = new FavoriteApi(ServerEndpoints.favorite);
export const reviewsApi: TReviewsApi = new ReviewsApi(ServerEndpoints.comments);
export const userApi: TUserApi = new UserApi(ServerEndpoints.login);
