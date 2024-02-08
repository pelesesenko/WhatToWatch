import React from 'react';
import {render, screen} from '../../../tests/utils';
import Footer from './footer';


const mockLogo = jest.fn((props) => [...props]);
jest.mock(
  '../logo/logo.tsx',
  () => jest.fn(({withLink}) => mockLogo({withLink}))
);

describe('Footer component should render correctly', () => {
  it('Render Logo with correct props', () => {
    const {rerender} = render(<Footer main />);
    rerender(<Footer />);

    expect(mockLogo).toHaveBeenCalledTimes(2);
    expect(mockLogo).toHaveBeenNthCalledWith(1, {withLink: false});
    expect(mockLogo).toHaveBeenNthCalledWith(2, {withLink: true});
  });

  it('Copyright', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});
