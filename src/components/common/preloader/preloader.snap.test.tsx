import React from 'react';
import {render} from '../../../tests/utils';
import Preloader from './preloader';

it('Preloader component should render correctly', () => {
  const {container} = render(<Preloader />);

  expect(container).toMatchSnapshot();
});
