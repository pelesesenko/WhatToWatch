import React from 'react';
import {AppPaths} from '../../../constants';
import {render, screen} from '../../../tests/utils';
import Logo from './logo';

describe(`Logo component should render correctly`, () => {
  it(`without link`, () => {
    render(<Logo withLink={false} />);

    expect(screen.queryByRole(`link`)).toBeNull();
  });

  it(`with link to Main page`, () => {
    render(<Logo withLink />);

    expect(screen.getByRole(`link`)).toHaveAttribute(`href`, AppPaths.MAIN);
  });
});
