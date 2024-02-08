import React from 'react';
import {render, screen} from '../../../tests/utils';
import {AddReview} from './add-review';

import {Pages} from '../../../constants';
import {stubFilm} from '../../../tests/mock';
import Film from '../../../types/film';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFilmBackImg = jest.fn((_) => null);
jest.mock(
  '../../common/film-back-img/film-back-img.tsx',
  () => jest.fn(({film}) => mockFilmBackImg({film}))
);

const mockPreloader = jest.fn(() => '');
jest.mock(
  '../../common/preloader/preloader.tsx',
  () => jest.fn(() => mockPreloader())
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockHeader = jest.fn((_) => null);
jest.mock(
  '../../common/header/header.tsx',
  () => jest.fn(({film, page}) => mockHeader({film, page}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockPoster = jest.fn((_) => null);
jest.mock(
  '../../common/poster/poster.tsx',
  () => jest.fn(({film, mode}) => mockPoster({film, mode}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockAddReviewForm = jest.fn((_) => null);
jest.mock(
  './add-review-form/add-review-form.tsx',
  () => jest.fn(({id}) => mockAddReviewForm({id}))
);

let mockUseLoadFilm: Film | undefined;
jest.mock(
  '../../../hooks/load-film-by-id.ts',
  () => jest.fn(() => mockUseLoadFilm)
);

describe('AddReview component renders:', () => {
  it('Preloader when film is undefined', () => {
    mockUseLoadFilm = undefined;
    render(<AddReview id={stubFilm.id} />);

    expect(mockPreloader).toBeCalledTimes(1);
  });

  describe('Children components with correct props', () => {

    it('FilmBackImg', () => {
      mockUseLoadFilm = stubFilm;
      render(<AddReview id={stubFilm.id} />);

      expect(mockFilmBackImg).toBeCalledTimes(1);
      expect(mockFilmBackImg).toBeCalledWith({film: stubFilm});
    });

    it('Title (hidden)', () => {
      render(<AddReview id={stubFilm.id} />);

      expect(screen.getByRole('heading', {name: /WTW/i})).toHaveClass('visually-hidden');
    });

    it('Header', () => {
      render(<AddReview id={stubFilm.id} />);

      expect(mockHeader).toBeCalledTimes(1);
      expect(mockHeader).toBeCalledWith({film: stubFilm, page: Pages.ADD_REVIEW});
    });

    it('Poster', () => {
      render(<AddReview id={stubFilm.id} />);

      expect(mockPoster).toBeCalledTimes(1);
      expect(mockPoster).toBeCalledWith({film: stubFilm, mode: 'small'});
    });

    it('AddReviewForm', () => {
      render(<AddReview id={stubFilm.id} />);

      expect(mockAddReviewForm).toBeCalledTimes(1);
      expect(mockAddReviewForm).toBeCalledWith({id: stubFilm.id});
    });
  });
});
