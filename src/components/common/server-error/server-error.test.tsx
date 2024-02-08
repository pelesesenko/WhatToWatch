import React from 'react';
import {render} from '../../../tests/utils';
import ServerError from './server-error';

it('ServerError component should render correctly', () => {
  const {container} = render(<ServerError />);

  expect(container).toMatchSnapshot();
});
