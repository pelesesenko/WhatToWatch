import React from 'react';
import {Pages} from '../../../constants';
import {stubFilm} from '../../../tests/mock';
import {render, screen, Screen} from '../../../tests/utils';
import Header from './header';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockBreadcrambs = jest.fn((_) => null);
jest.mock(
  '../breadcrambs/breadcrambs.tsx',
  () => jest.fn(({film}) => mockBreadcrambs({film}))
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockLogo = jest.fn((_) => null);
jest.mock(
  '../logo/logo.tsx',
  () => jest.fn(({withLink}) => mockLogo({withLink}))
);

const mockUserBlock = jest.fn(() => '');
jest.mock(
  '../user-block/user-block.tsx',
  () => jest.fn(() => mockUserBlock())
);

const queryTitle = (scr: Screen, name?: RegExp) => scr.queryByRole('heading', {name});
const getWrapper = (scr: Screen) => scr.getByTestId('header');

describe('Header component should render correctly', () => {
  describe('depending on parent page:', () => {
    it('on Main', () => {
      render(<Header page={Pages.MAIN} />);

      expect(getWrapper(screen)).toHaveClass('movie-card__head');
      expect(mockLogo).toBeCalledTimes(1);
      expect(mockLogo).toBeCalledWith({withLink: false});
      expect(queryTitle(screen)).toBeNull();
      expect(mockUserBlock).toBeCalledTimes(1);
      expect(mockUserBlock).toBeCalledWith();
    });

    it('on Film', () => {
      render(<Header page={Pages.FILM} />);

      expect(getWrapper(screen)).toHaveClass('movie-card__head');
      expect(mockLogo).toBeCalledTimes(1);
      expect(mockLogo).toBeCalledWith({withLink: true});
      expect(queryTitle(screen)).toBeNull();
      expect(mockUserBlock).toBeCalledTimes(1);
      expect(mockUserBlock).toBeCalledWith();
    });

    it('on Login', () => {
      render(<Header page={Pages.LOGIN} />);

      expect(getWrapper(screen)).toHaveClass('user-page__head');
      expect(mockLogo).toBeCalledTimes(1);
      expect(mockLogo).toBeCalledWith({withLink: true});
      expect(queryTitle(screen, /Sign in/i)).toBeInTheDocument();
      expect(mockUserBlock).toBeCalledTimes(0);
    });

    it('on MyList', () => {
      render(<Header page={Pages.MY_LIST} />);

      expect(getWrapper(screen)).toHaveClass('user-page__head');
      expect(mockLogo).toBeCalledTimes(1);
      expect(mockLogo).toBeCalledWith({withLink: true});
      expect(queryTitle(screen, /My list/i)).toBeInTheDocument();
      expect(mockUserBlock).toBeCalledTimes(1);
      expect(mockUserBlock).toBeCalledWith();
    });

    it('on AddReview', () => {
      render(<Header page={Pages.ADD_REVIEW} />);

      expect(getWrapper(screen)).toHaveClass('page-header', {exact: true});
      expect(mockLogo).toBeCalledTimes(1);
      expect(mockLogo).toBeCalledWith({withLink: true});
      expect(queryTitle(screen)).toBeNull();
      expect(mockUserBlock).toBeCalledTimes(1);
      expect(mockUserBlock).toBeCalledWith();
    });

    it('on NotFound', () => {
      render(<Header page={Pages.NOT_FOUND} />);

      expect(getWrapper(screen)).toHaveClass('movie-card__head');
      expect(mockLogo).toBeCalledTimes(1);
      expect(mockLogo).toBeCalledWith({withLink: true});
      expect(queryTitle(screen)).toBeNull();
      expect(mockUserBlock).toBeCalledTimes(1);
      expect(mockUserBlock).toBeCalledWith();
    });
  });

  it('render BreadCrambs child with correct props', () => {
    render(<Header page={Pages.MAIN}/>);
    render(<Header page={Pages.FILM} film={stubFilm}/>);

    expect(mockBreadcrambs).toHaveBeenCalledTimes(1);
    expect(mockBreadcrambs).toHaveBeenNthCalledWith(1, {film: stubFilm});
  });
});
