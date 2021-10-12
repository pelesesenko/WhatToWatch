import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Pages, AppPaths} from '../../../constants';

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

  const auth = 1;

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
      <div className="user-block">
        {auth
          ? <div className="user-block__avatar">
              <Link to={AppPaths.MY_LIST}>
                <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
              </Link>
            </div>
          : <Link to={AppPaths.LOGIN} className="user-block__link">Sign in</Link>}
      </div>}
    </header>
  );
};
export default Header;
