import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Pages, AppPaths} from '../../../constants';
import Film from '../../../types/film';
import { makeLink } from '../../../utilites';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

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
  film?: Film,
}

const Header:FC<Props> = ({page, film}) => {

  return (
    <header className={`page-header${config[page].addClassName}`}>
      <div className="logo">
        <Logo withLink={page !== Pages.MAIN}/>
      </div>
      {film &&
      <nav className="breadcrumbs">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={makeLink(AppPaths.FILM, film.id)} className="breadcrumbs__link">{film.name}</Link>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link">Add review</a>
          </li>
        </ul>
      </nav>}
      {config[page].title && <h1 className="page-title user-page__title">{config[page].title}</h1> }
      {config[page].showUserBlock && <UserBlock />}
    </header>
  );
};

export default Header;
