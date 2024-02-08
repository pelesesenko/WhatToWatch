import React from 'react';
import {render, screen} from '../../../tests/utils';
import {stubFilm} from '../../../tests/mock';
import FilmBackImg from './film-back-img';

it('FilmBackImg component should render correctly', () => {
  render(<FilmBackImg film={stubFilm} />);

  expect(screen.getByRole('img')).toHaveAttribute('src', stubFilm.backgroundImage);
});

