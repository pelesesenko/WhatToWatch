import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths} from '../../../constants';
import Film from '../../../types/film';
import {addIdParam} from '../../../utils';

interface Props {
  film: Film,
}

const Breadcrambs:FC<Props> = ({film}) => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={addIdParam(AppPaths.FILM, film.id)} className="breadcrumbs__link">{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrambs;
