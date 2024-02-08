import React from 'react';
import {render} from '../../../../../tests/utils';
import FilmDetails from './film-details';

import * as Utils from '../../../../../utils';
import {stubFilm} from '../../../../../tests/mock';
import {FilmDetailsTitles} from '../../../../../constants';
import {formatRunTime} from '../../../../../utils';
import Film from '../../../../../types/film';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmDetailsSection = jest.fn((_) => '');
jest.mock(
  '../film-details-section/film-details-section.tsx',
  () => jest.fn(({title, value}) => mockFilmDetailsSection({title, value}))
);

jest.spyOn(Utils, 'formatStarring').mockImplementation((film: Film) => film.starring);

describe('FilmDetails component renders sections with correct props', () => {

  it('Director', () => {
    render(<FilmDetails film={stubFilm} />);

    expect(mockFilmDetailsSection).toHaveBeenNthCalledWith(
      1,
      {
        title: FilmDetailsTitles.director,
        value: stubFilm.director
      }
    );
  });

  it('Starring', () => {
    render(<FilmDetails film={stubFilm} />);

    expect(mockFilmDetailsSection).toHaveBeenNthCalledWith(
      2,
      {
        title: FilmDetailsTitles.starring,
        value: stubFilm.starring
      }
    );
  });

  it('Runtime', () => {
    render(<FilmDetails film={stubFilm} />);

    expect(mockFilmDetailsSection).toHaveBeenNthCalledWith(
      3,
      {
        title: FilmDetailsTitles.runtime,
        value: formatRunTime(stubFilm.runTime)
      }
    );
  });

  it('Genre', () => {
    render(<FilmDetails film={stubFilm} />);

    expect(mockFilmDetailsSection).toHaveBeenNthCalledWith(
      4,
      {
        title: FilmDetailsTitles.genre,
        value: stubFilm.genre
      }
    );
  });

  it('Released', () => {
    render(<FilmDetails film={stubFilm} />);

    expect(mockFilmDetailsSection).toHaveBeenNthCalledWith(
      5,
      {
        title: FilmDetailsTitles.released,
        value: String(stubFilm.released)
      }
    );
  });
});
