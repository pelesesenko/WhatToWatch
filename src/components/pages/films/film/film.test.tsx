import React from 'react';
import {render, screen} from '../../../../tests/utils';
import {Film} from './film';

import IFilm from '../../../../types/film';
import * as FilmsSelectors from '../../../../store/films/selectors';
import {stubFilm} from '../../../../tests/mock';

let fakeFilm: IFilm | undefined;
jest.mock(
  '../../../../hooks/load-film-by-id.ts',
  () => jest.fn(() => fakeFilm)
);

const stubAlikeIds: number[] = [3, 2, 1];
jest.spyOn(FilmsSelectors, 'selectFilmIdsSameGenre').mockReturnValue(stubAlikeIds);

const mockPreloader = jest.fn(() => '');
jest.mock(
  '../../../common/preloader/preloader.tsx',
  () => jest.fn(() => mockPreloader())
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmContent = jest.fn((_) => '');
jest.mock(
  './film-content/film-content.tsx',
  () => jest.fn(({film}) => mockFilmContent({film}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmCardList = jest.fn((_) => '');
jest.mock(
  '../../../common/film-card-list/film-card-list.tsx',
  () => jest.fn(({ids}) => mockFilmCardList({ids}))
);

const mockFooter = jest.fn(() => '');
jest.mock(
  '../../../common/footer/footer.tsx',
  () => jest.fn(() => mockFooter())
);

const stubId = 24;

describe('Film component renders correctly', () => {
  describe('depending on film value', () => {
    it('Preloader when film is not defined', () => {
      fakeFilm = undefined;
      render(<Film id={stubId} />);

      expect(mockPreloader).toBeCalledTimes(1);
      expect(mockFilmContent).toBeCalledTimes(0);
    });

    it('FilmContent when film is defined', () => {
      fakeFilm = stubFilm;
      render(<Film id={stubId} />);

      expect(mockPreloader).toBeCalledTimes(0);
      expect(mockFilmContent).toBeCalledTimes(1);
      expect(mockFilmContent).toBeCalledWith({film: stubFilm});
    });
  });
  describe('Other children', () => {
    it('List title', () => {
      render(<Film id={stubId} />);

      expect(screen.getByRole('heading', {name: /More like this/i})).toBeInTheDocument();
    });

    it('FilmCardList', () => {
      render(<Film id={stubId} />);

      expect(mockFilmCardList).toBeCalledTimes(1);
      expect(mockFilmCardList).toBeCalledWith({ids: stubAlikeIds});
    });

    it('Footer', () => {
      render(<Film id={stubId} />);

      expect(mockFooter).toBeCalledTimes(1);
    });
  });
});
