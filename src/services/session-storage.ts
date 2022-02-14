import browserHistory from '../browser-history';
import {History} from 'history';

class BackUrl {
  constructor(
    protected key: string,
    protected history: History
  ) {}

  set() {
    sessionStorage.setItem(this.key, this.history.location.pathname);
  }

  get() {
    return sessionStorage.getItem(this.key);
  }

  clear() {
    sessionStorage.removeItem(this.key);
  }
}

export const loginBackUrl = new BackUrl(`login-back-url`, browserHistory);
export const playerBackUrl = new BackUrl(`player-back-url`, browserHistory);
