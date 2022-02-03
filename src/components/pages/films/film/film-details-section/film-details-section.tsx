import React, {FC} from 'react';
import {FilmDetailsTitles} from '../../../../../constants';

interface Props {
  title: typeof FilmDetailsTitles[keyof typeof FilmDetailsTitles];
  value: string | (string | JSX.Element)[];
}

const FilmDetailsSection:FC<Props> = ({title, value}) => (
  <p className="movie-card__details-item" key={title}>
    <strong className="movie-card__details-name">{title}</strong>
    <span className="movie-card__details-value">{value}</span>
  </p>
);

export default FilmDetailsSection;
