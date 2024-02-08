import React from 'react';
import {render, screen} from '../../../tests/utils';
import {stubFilm} from '../../../tests/mock';
import FilmDesc from './film-desc';

const mockMovieButtons = jest.fn((props) => [...props]);
jest.mock(
  '../movie-buttons/movie-buttons.tsx',
  () => jest.fn(({id, favStatus, withAddReview}) => mockMovieButtons({id, favStatus, withAddReview}))
);

stubFilm.name = 'Test film name';
stubFilm.genre = 'Test film genre';

describe('FilmDesc component should render correctly', () => {

  it('Title with link', () => {
    render(<FilmDesc film={stubFilm} withLink />);

    expect(screen.getByRole('link', {name: /Test film name/i})).toBeInTheDocument();
  });

  it('Title without link', () => {
    render(<FilmDesc film={stubFilm} />);

    expect(screen.queryByRole('link', {name: /Test film name/i})).toBeNull();
  });

  it('Film genre', () => {
    render(<FilmDesc film={stubFilm} />);

    expect(screen.getByText(/Test film genre/i)).toBeInTheDocument();
  });

  it('Film released', () => {
    render(<FilmDesc film={stubFilm} />);

    expect(screen.getByText(stubFilm.released)).toBeInTheDocument();
  });

  it('Render MovieButtons child with correct props', () => {
    const {rerender} = render(<FilmDesc film={stubFilm} withAddReview />);
    stubFilm.isFavorite = true;
    rerender(<FilmDesc film={stubFilm}/>);

    const expectedProps1 = {id: stubFilm.id, favStatus: false, withAddReview: true};
    const expectedProps2 = {id: stubFilm.id, favStatus: true, withAddReview: undefined};

    expect(mockMovieButtons).toBeCalledTimes(2);
    expect(mockMovieButtons).toHaveBeenNthCalledWith(1, expectedProps1);
    expect(mockMovieButtons).toHaveBeenNthCalledWith(2, expectedProps2);
  });
});
