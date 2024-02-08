import userEvent from '@testing-library/user-event';
import React from 'react';
import {render, screen} from '../../../tests/utils';
import LogoutBtn from './logout-btn';

const mockOnClick = jest.fn();

it('LogoutBtn component should handle click correctly', () => {
  render(<LogoutBtn onClick={mockOnClick} />);

  userEvent.click(screen.getByRole('button'));

  expect(mockOnClick).toBeCalledTimes(1);
});
