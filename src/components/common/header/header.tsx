import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Pages, AppPaths, AuthorizationStatuses} from '../../../constants';
import { login, logout, selectAuthStatus, selectUser } from '../../../store/slices/user-slice';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface HeaderConfig {
  [key: string]: {
    addClassName: string,
    title?: string,
    showUserBlock: boolean,
  }
}

const config: HeaderConfig = {
  [Pages.MAIN]: {
    addClassName: ` movie-card__head`,
    showUserBlock: true
  },
  [Pages.FILM]: {
    addClassName: ` movie-card__head`,
    showUserBlock: true
  },
  [Pages.LOGIN]: {
    addClassName: ` user-page__head`,
    title: `Sign in`,
    showUserBlock: false
  },
  [Pages.MY_LIST]: {
    addClassName: ` user-page__head`,
    title: `My list`,
    showUserBlock: true
  },
  [Pages.ADD_REVIEW]: {
    addClassName: ``,
    showUserBlock: true
  },
  [Pages.NOT_FOUND]: {
    addClassName: ` movie-card__head`,
    showUserBlock: true
  },
};

interface Props {
  page: typeof Pages[keyof typeof Pages],
  filmName?: string,
}

const Header:FC<Props> = ({page, filmName}) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const onLogout = () => dispatch(logout()) //1;

  return (
    <header className={`page-header${config[page].addClassName}`}>
      <div className="logo">
        {page === Pages.MAIN
          ? <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          : <Link className="logo__link" to={AppPaths.MAIN}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>}
      </div>
      {filmName &&
      <nav className="breadcrumbs">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a href="movie-page.html" className="breadcrumbs__link">{filmName}</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link">Add review</a>
          </li>
        </ul>
      </nav>}
      {config[page].title && <h1 className="page-title user-page__title">{config[page].title}</h1> }
      {config[page].showUserBlock &&
      <div className="user-block" style={{display: 'flex'}} >
        {authStatus === AuthorizationStatuses.authorized
          ?
          <>
            <div className="user-block__avatar" >
                <Link to={AppPaths.MY_LIST}>
                  <img src={user?.avatarUrl} alt="User avatar" width={63} height={63} />
                </Link>
              </div>
              <button onClick={onLogout} className="button"
                style={{marginLeft: `30px`, backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none"  stroke="#444" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1={21} y1={12} x2={9} y2={12} />
              </svg>
            </button>
          </>
          : <Link to={AppPaths.LOGIN} className="user-block__link">Sign in</Link>}
      </div>}
    </header>
  );
};
export default Header;
