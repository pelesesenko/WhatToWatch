import React from 'react';
import {render, screen} from '../../../tests/utils';
import {stubFilm} from '../../../tests/mock';
import Breadcrambs from './breadcrambs';
import {AppPaths} from '../../../constants';
import {addIdParam} from '../../../utils';

describe(`Breadcrambs component`, () =>{

  it(`Should render correctly`, () => {
    render(<Breadcrambs film={stubFilm} />);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it(`Should render link with correct href attribute`, () => {
    render(<Breadcrambs film={stubFilm} />);
    const url = addIdParam(AppPaths.FILM, stubFilm.id);

    expect(screen.getByRole(`link`)).toHaveAttribute(`href`, url);
  });

  it(`Should render link with correct text`, () => {
    stubFilm.name = `Test film name`;
    render(<Breadcrambs film={stubFilm} />);

    expect(screen.getByRole(`link`)).toHaveTextContent(stubFilm.name);
  });
});
