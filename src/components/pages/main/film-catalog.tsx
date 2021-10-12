import React, {FC} from 'react';
import FilmCardList from '../../common/film-card-list/film-card-list';
import {FilmIdsByGenre} from '../../../types/film';
import GenresList from './genres-list';
import {MAX_GENRES_NUMBER} from '../../../constants';


interface Props {
  allFilmIds: number[],
  filmIdsByGenre: FilmIdsByGenre
};

const FilmCatalog:FC<Props> = ({allFilmIds, filmIdsByGenre}) => {

  const ids = (true) ? allFilmIds : filmIdsByGenre['1'];

  const allGenres = Object.keys(filmIdsByGenre);
  const genres = allGenres.length > MAX_GENRES_NUMBER ? allGenres.slice(MAX_GENRES_NUMBER) : allGenres
  return (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <GenresList currentGenre={null} genres={genres}/>

    <FilmCardList filmIds={ids} />

    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  </section>
  )
};

export default FilmCatalog;
