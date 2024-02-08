import React from 'react';
import {AppPaths} from '../../../constants';
import {stubFilm} from '../../../tests/mock';
import {render, screen} from '../../../tests/utils';
import {addIdParam} from '../../../utils';
import Poster from './poster';

describe('Poster component should render', () => {
  it('correct image', () => {
    render(<Poster film={stubFilm} />);

    const img = screen.getByRole('img', {name: `${stubFilm.name} poster`});

    expect(img).toHaveAttribute('src', stubFilm.posterImage);
  });

  describe('accordingly to conditions from props:', () => {
    it('with link', () => {
      render(<Poster film={stubFilm} withLink />);

      const link = screen.getByRole('link', {name: `${stubFilm.name} poster`});

      expect(link).toHaveAttribute('href', addIdParam(AppPaths.FILM, stubFilm.id));
    });

    it('without link', () => {
      render(<Poster film={stubFilm} />);

      const link = screen.queryByRole('link', {name: `${stubFilm.name} poster`});

      expect(link).toBeNull();
    });

    it('with class modifier', () => {
      const {container} = render(<Poster film={stubFilm} mode='small'/>);

      expect(container.firstChild).toHaveClass('movie-card__poster movie-card__poster--small', {exact: true});
    });

    it('without class modifier', () => {
      const {container} = render(<Poster film={stubFilm} />);

      expect(container.firstChild).toHaveClass('movie-card__poster', {exact: true});
    });
  });
});
