import React from 'react';
import {render} from '../../../tests/utils';
import FilmCardList from './film-card-list';

const stubIds = [1, 2, 3];
const mockFilmCard = jest.fn((id) => id);
jest.mock('../film-card/film-card.tsx', () => jest.fn(({id}) => mockFilmCard(id)));

it('FilmCardList component should render correctly', () => {
  render(<FilmCardList ids={stubIds} />);
  expect(mockFilmCard).toHaveBeenCalledTimes(3);
  expect(mockFilmCard).toHaveBeenNthCalledWith(1, 1);
  expect(mockFilmCard).toHaveBeenNthCalledWith(2, 2);
  expect(mockFilmCard).toHaveBeenNthCalledWith(3, 3);
});
