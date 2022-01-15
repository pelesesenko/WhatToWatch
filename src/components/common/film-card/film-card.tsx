import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths} from '../../../constants';
import {selectFilmById} from '../../../store/slices/films-slice';
import {useAppSelector} from '../../../store/store';
import {makeLink} from '../../../utilites';
import Preloader from '../preloader/preloader';
import './film-card.css';

interface Props {
  id: number,
}

const FilmCard:FC<Props> = ({id}) => {

  const film = useAppSelector((state) => selectFilmById(state, id));

  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  React.useEffect(() => {

    const timerOver = isMouseOver ? setTimeout(() => setIsVideo(true), 1000) : null;
    if (!isMouseOver) {
      setIsVideo(false);
      if (timerOver) {
        clearTimeout(timerOver);
      }
    }

    return () => {
      if (timerOver) {
        clearTimeout(timerOver);
      }
    };
  }, [isMouseOver]);

  return (
    <>
      {!film ? <Preloader />
        :
        <article className="small-movie-card catalog__movies-card">
          <Link to={makeLink(AppPaths.FILM, film.id)}>
            <div className="small-movie-card__image"
              onMouseEnter={() => setIsMouseOver(true)}
              onMouseLeave={() => setIsMouseOver(false)}>
              <img src={film.previewImage} alt={film.name} width={280} height={175} />
              {isVideo && <video className='film-card-video' src={film.previewVideoLink} autoPlay />}
            </div>
          </Link>
          <h3 className="small-movie-card__title">
            <Link className="small-movie-card__link" to={makeLink(AppPaths.FILM, film.id)}>{film.name}</Link>
          </h3>
        </article>}
    </>
  );
};

export default FilmCard;
