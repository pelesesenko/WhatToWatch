import React from 'react';
import {render, screen, Screen, waitFor} from '../../../../tests/utils';
import AddReviewForm from './add-review-form';

import * as store from '../../../../store/store';
import * as Actions from '../../../../store/film-info/actions';
import {Any} from '../../../../types/common';
import userEvent from '@testing-library/user-event';
import {FormErrorMessages, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH} from '../../../../constants';

const mockDispatch = jest.fn();
jest.spyOn(store, 'useAppDispatch').mockReturnValue(mockDispatch);

jest.spyOn(Actions, 'postFilmReview').mockImplementation((data: Any) => data);

const stubId = 24;

const validComment = 'a'.repeat(MIN_COMMENT_LENGTH);

const getButton = (scr: Screen) => scr.getByRole('button', {name: /Post/i});
const getCommentBox = (scr: Screen) => scr.getByPlaceholderText(/Review text/i);
const getRating5 = (scr: Screen) => scr.getAllByRole('radio', {name: /^Rating/i})[4];

describe('AddReviewForm component', () => {
  describe('renders correctly', () => {
    it('rating inputs, no checked', () => {
      render(<AddReviewForm id={stubId} />);

      expect(screen.getAllByRole('radio', {name: /^Rating/i})).toHaveLength(10);
      expect(screen.queryByRole('radio', {name: /^Rating/i, checked: true})).toBeNull();
    });

    it('comment input', () => {
      render(<AddReviewForm id={stubId} />);

      const byRole = screen.getByRole('textbox');

      expect(getCommentBox(screen)).toBe(byRole);
      expect(getCommentBox(screen)).toHaveDisplayValue('');
    });

    it('submit button', () => {
      render(<AddReviewForm id={stubId} />);

      expect(getButton(screen)).toBeInTheDocument();
    });

    it('no errors', () => {
      render(<AddReviewForm id={stubId} />);

      expect(screen.queryByTestId('form-error')).toBeNull();
    });
  });

  describe('handles user input correctly', () => {
    it('rating', () => {
      render(<AddReviewForm id={stubId} />);

      userEvent.click(getRating5(screen));

      expect(getRating5(screen)).toBeChecked();
    });

    it('comment', () => {
      render(<AddReviewForm id={stubId} />);

      userEvent.type(getCommentBox(screen), 'Test comment');

      expect(getCommentBox(screen)).toHaveDisplayValue('Test comment');
    });
  });

  describe('does not submit and shows error messages with invalid data', () => {
    it('no rating defined', async () => {
      render(<AddReviewForm id={stubId} />);

      userEvent.click(getButton(screen));

      expect(await screen.findByText(new RegExp(FormErrorMessages.rating, 'i'))).toBeInTheDocument();
    });

    it('too short comment', async () => {
      render(<AddReviewForm id={stubId} />);

      userEvent.type(getCommentBox(screen), 'a'.repeat(MIN_COMMENT_LENGTH - 1));
      userEvent.click(getButton(screen));

      expect(await screen.findByText(new RegExp(FormErrorMessages.comment, 'i'))).toBeInTheDocument();
    });

    it('too long comment', async () => {
      render(<AddReviewForm id={stubId} />);

      userEvent.type(getCommentBox(screen), 'a'.repeat(MAX_COMMENT_LENGTH + 1));
      userEvent.click(getButton(screen));

      expect(await screen.findByText(new RegExp(FormErrorMessages.comment, 'i'))).toBeInTheDocument();
    });
  });

  it('on submit dispatches action with correct data', async () => {
    render(<AddReviewForm id={stubId} />);

    userEvent.click(getRating5(screen));
    userEvent.type(getCommentBox(screen), validComment);
    userEvent.click(getButton(screen));

    const expectedData = {id: stubId, review: {rating: '5', comment: validComment}};

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith(expectedData);
    });
  });
});
