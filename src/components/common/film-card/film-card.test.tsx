import userEvent from '@testing-library/user-event';
import React from 'react';
import {AppPaths} from '../../../constants';
import {stubFilm} from '../../../tests/mock';
import * as store from '../../../store/store';
import {render, screen, timeOut, waitFor} from '../../../tests/utils';
import {addIdParam} from '../../../utils';
import FilmCard from './film-card';

jest.spyOn(store, 'useAppSelector').mockReturnValue(stubFilm);

describe('FilmCard component', () => {
  describe('Should render correctly', () => {

    it('Preview image', () =>{
      render(<FilmCard id={stubFilm.id} />);

      expect(screen.getByRole('img', {name: stubFilm.name})).toHaveAttribute('src', stubFilm.previewImage);
    });

    it('Film title', () => {
      stubFilm.name = 'Test film name';
      render(<FilmCard id={stubFilm.id} />);

      expect(screen.getByRole('heading', {name: /Test film name/i})).toBeInTheDocument();
    });

    it('Links', () => {
      render(<FilmCard id={stubFilm.id} />);
      const [imgLink, titleLink] = screen.getAllByRole('link');
      const expectedHref = addIdParam(AppPaths.FILM, stubFilm.id);

      expect(imgLink).toHaveAttribute('href', expectedHref);
      expect(titleLink).toHaveAttribute('href', expectedHref);
    });

    it('No video on initial render', () => {
      render(<FilmCard id={stubFilm.id} />);

      expect(screen.queryByTestId('video')).toBe(null);
    });
  });

  describe('Should handle user events correctly', () => {
    const waitForOptions = {timeout: 1300, interval: 1000};

    it('Video on hover', async () => {
      render(<FilmCard id={stubFilm.id} />);

      const wrapper = screen.getByRole('article');
      userEvent.hover(wrapper);

      expect(await screen.findByTestId('video', undefined, waitForOptions)).toBeInTheDocument();
    });

    it('Video does not appear with unhover just after hover', async () => {
      render(<FilmCard id={stubFilm.id} />);

      const wrapper = screen.getByRole('article');
      userEvent.hover(wrapper);
      userEvent.unhover(wrapper);
      // eslint-disable-next-line
      await waitFor(async () => {
        await timeOut(1250);
        expect(screen.queryByTestId('video')).not.toBeInTheDocument();
      }, waitForOptions);
    });

    it('Video is removed on unhover', async () => {
      render(<FilmCard id={stubFilm.id} />);

      const wrapper = screen.getByRole('article');
      userEvent.hover(wrapper);
      // eslint-disable-next-line
      await waitFor(async () => {
        await timeOut(1250);
        expect(screen.getByTestId('video')).toBeInTheDocument();

        userEvent.unhover(wrapper);

        await timeOut(10);
        expect(screen.queryByTestId('video')).not.toBeInTheDocument();
      }, waitForOptions);
    });
  });
});
