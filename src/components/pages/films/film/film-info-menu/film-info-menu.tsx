import React, {FC} from 'react';
import {FilmInfoTabs} from '../../../../../constants';
import {currentTabChanged} from '../../../../../store/film-info/actions';
import {useAppDispatch} from '../../../../../store/store';

interface Props {
  current: typeof FilmInfoTabs[number];
}

const FilmInfoMenu:FC<Props> = ({current}) => {

  const dispatch = useAppDispatch();

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {FilmInfoTabs.map((tab) => (
          <li className={`movie-nav__item${tab === current ? ` movie-nav__item--active` : ``}`}
            key={tab} >
            <a onClick={() => dispatch(currentTabChanged(tab))}
              style={{cursor: `pointer`}}
              className="movie-nav__link">{tab}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FilmInfoMenu;
