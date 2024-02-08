import React, {FC} from 'react';
import {FilmInfoTabs, TFilmInfoTabs} from '../../../../../constants';
import {currentTabChanged} from '../../../../../store/film-info/actions';
import {useAppDispatch} from '../../../../../store/store';
import styles from './film-info-menu.module.css';

interface Props {
  current: TFilmInfoTabs;
}

const FilmInfoMenu:FC<Props> = ({current}) => {

  const dispatch = useAppDispatch();
  const handleClick = (tab: TFilmInfoTabs) => () => dispatch(currentTabChanged(tab));

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {Object.values(FilmInfoTabs).map((tab) => (
          <li className={`movie-nav__item${tab === current ? ' movie-nav__item--active' : ''}`} key={tab}>
            <a onClick={handleClick(tab)} className={`movie-nav__link ${styles.cursorPointer}`}>
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FilmInfoMenu;
