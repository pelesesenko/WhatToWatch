import React from 'react';
import {render, screen} from '../../../../../tests/utils';
import FilmContent from './film-content';

import {Pages} from '../../../../../constants';
import {stubFilm} from '../../../../../tests/mock';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmBackImg = jest.fn((_) => '');
jest.mock(
  '../../../../common/film-back-img/film-back-img.tsx',
  () => jest.fn(({film}) => mockFilmBackImg({film}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockHeader = jest.fn((_) => '');
jest.mock(
  '../../../../common/header/header.tsx',
  () => jest.fn(({page}) => mockHeader({page}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmDesc = jest.fn((_) => '');
jest.mock(
  '../../../../common/film-desc/film-desc.tsx',
  () => jest.fn(({film, withAddReview}) => mockFilmDesc({film, withAddReview}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmInfo = jest.fn((_) => '');
jest.mock(
  '../film-info/film-info.tsx',
  () => jest.fn(({film}) => mockFilmInfo({film}))
);

describe('FilmContent component renders correctly', () => {
  it('FilmBackImg', () => {
    render(<FilmContent film={stubFilm}/>);

    expect(mockFilmBackImg).toBeCalledTimes(1);
    expect(mockFilmBackImg).toBeCalledWith({film: stubFilm});
  });

  it('Header', () => {
    render(<FilmContent film={stubFilm}/>);

    expect(mockHeader).toBeCalledTimes(1);
    expect(mockHeader).toBeCalledWith({page: Pages.FILM});
  });

  it('Title (hidden)', () => {
    render(<FilmContent film={stubFilm}/>);

    expect(screen.getByRole('heading', {name: /WTW/i})).toBeInTheDocument();
  });

  it('FilmDesc', () => {
    render(<FilmContent film={stubFilm}/>);

    expect(mockFilmDesc).toBeCalledTimes(1);
    expect(mockFilmDesc).toBeCalledWith({film: stubFilm, withAddReview: true});
  });

  it('FilmInfo', () => {
    render(<FilmContent film={stubFilm}/>);

    expect(mockFilmInfo).toBeCalledTimes(1);
    expect(mockFilmInfo).toBeCalledWith({film: stubFilm});
  });
});
