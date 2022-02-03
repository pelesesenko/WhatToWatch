import React, {FC} from 'react';
import {Pages} from '../../../constants';
import Film from '../../../types/film';
import Breadcrambs from '../breadcrambs/breadcrambs';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

interface HeaderConfig {
  [key: string]: {
    addClassName: string,
    title?: string,
    hideUserBlock?: true,
  }
}

const config: HeaderConfig = {
  [Pages.MAIN]: {
    addClassName: ` movie-card__head`,
  },
  [Pages.FILM]: {
    addClassName: ` movie-card__head`,
  },
  [Pages.LOGIN]: {
    addClassName: ` user-page__head`,
    title: `Sign in`,
    hideUserBlock: true
  },
  [Pages.MY_LIST]: {
    addClassName: ` user-page__head`,
    title: `My list`,
  },
  [Pages.ADD_REVIEW]: {
    addClassName: ``,
  },
  [Pages.NOT_FOUND]: {
    addClassName: ` movie-card__head`,
  },
};

interface Props {
  page: typeof Pages[keyof typeof Pages],
  film?: Film,
}

const Header:FC<Props> = ({page, film}) => {
  return (
    <header className={`page-header${config[page].addClassName}`}>
      <Logo withLink={page !== Pages.MAIN}/>
      {film && <Breadcrambs film={film} />}
      {config[page].title && <h1 className="page-title user-page__title">{config[page].title}</h1> }
      {!config[page].hideUserBlock && <UserBlock />}
    </header>
  );
};

export default React.memo(Header);
