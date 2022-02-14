import React from 'react';
import {render, screen} from '../../../tests/utils';
import {stubFilms} from '../../../mock';
import Breadcrambs from './breadcrambs';
import {AppPaths} from '../../../constants';
import {addIdParam} from '../../../utils';

describe(`Breadcrambs component`, () =>{
  const film = stubFilms[0];

  film.name = `Test film name`;
  it(`Should render correctly`, () => {

    render(<Breadcrambs film={film} />);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it(`Should render correct link`, () => {

    render(<Breadcrambs film={film} />);
    const url = addIdParam(AppPaths.FILM, film.id);

    expect(screen.getByRole(`link`)).toHaveAttribute(`href`, url);
  });
});

