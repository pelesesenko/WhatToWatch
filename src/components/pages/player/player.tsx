import React, {FC, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import history from '../../../browser-history';
import { AppPaths, Pages } from '../../../constants';
import { selectFilmById, fetchFilmById } from '../../../store/slices/films-slice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { checkIdParam, makeLink } from '../../../utilites';
import Header from '../../common/header/header';
import './player.css';

interface UrlParams {
  id: string;
}

interface ProgressCoord {
  x: number;
  width: number;
}
const initial = document.createElement('video');

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;
  const strHours = hours < 10 ? '0' + hours : hours + '';
  const strMinutes = minutes < 10 ? '0' + minutes : minutes + '';
  const strSeconds = seconds < 10 ? '0' + seconds : seconds + '';
  return strHours + ':' + strMinutes + ':' + strSeconds;
}

const Player:FC = () => {
  const dispatch = useAppDispatch();
  const {id: param} = useParams<UrlParams>();

  if(!checkIdParam(param)) history.push(AppPaths.NOT_FOUND);

  const id = +param;
  const film = useAppSelector((state) => selectFilmById(state, id));

  React.useEffect(() => {
    if(film === undefined) {

      setTimeout(() => {

        dispatch(fetchFilmById(id))
      }, 1000)
    }
  }, [film, id]);

  const playerRef = useRef<HTMLVideoElement>(initial);
  const progressRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  const [tempProgressValue, setTempProgressValue] = useState<number | null>(null);
  const [progressCoord, setProgressCoord] = useState<ProgressCoord>({x: 0, width: 0});
  const [tip, setTip] = useState<{is: Boolean, x: number}>({is: false, x: 0});

  const onResize = () => {
    if(progressRef.current) {
      const {x, width} = progressRef.current.getBoundingClientRect();
      setProgressCoord({x, width});
    }
  }


  React.useLayoutEffect(() => {
    onResize();
    const player = playerRef.current;
    if(film === undefined) {
      setIsPlaying(false);
    } else {
      setTimeLeft(formatTime(film.runTime * 60));
      player.onfullscreenchange = () => {
        player.controls = !player.controls;
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      player.onfullscreenchange = null;
    }
  }, [film, playerRef.current]);

  const {currentTime, duration} = playerRef.current;

  let progressValue = tempProgressValue;
  if(progressValue === null) {
    progressValue = duration ? Math.floor(currentTime / duration * 10000) / 100 : 0;
  }

  const onPlayClick = () => {
    if(isPlaying) {
      playerRef.current.pause();
    } else playerRef.current.play();
  }

  const onExitClick = () => {
    history.push(makeLink(AppPaths.FILM, id));
  }

  const onFullClick = () => {
    playerRef.current.requestFullscreen();
  }

  const onTimeUpdate = () => {
    setTimeLeft(formatTime(Math.floor(duration - currentTime)));
  }



  const onMouseMove = (e: React.MouseEvent) => {
    if(tempProgressValue === null) return;

    const {x, width} = progressCoord;
    let eventX = e.clientX < x ? x : e.clientX;
    eventX = eventX > (x + width) ? (x + width) : eventX;
    setTempProgressValue((eventX - x) / width * 100);
  }

  const onMouseUp = () => {
    if(playerRef.current.duration && tempProgressValue !== null) {
      playerRef.current.currentTime = tempProgressValue * duration / 100;
      setTempProgressValue(null)
    }
  }

  const onProgressMouseDown = (e: React.MouseEvent) => {
    const {x, width} = progressCoord;
    const percentProgress = (e.clientX - x) / width * 100;
    setTempProgressValue(percentProgress);
    if(duration) {
      playerRef.current.currentTime = percentProgress / 100 * duration;
    }
  }

  const onProgressMouseEnter = (e: React.MouseEvent) => {
    setTip({is: true, x: e.clientX - progressCoord.x});
  }

  const onProgressMouseLeave = () => {
    setTip({is: false, x: 0});
  }
  const onProgressMouseMove = (e: React.MouseEvent) => {
    if(!tip.is) return;
    if(e.clientX < progressCoord.x || e.clientX > (progressCoord.x + progressCoord.width)) {
      onProgressMouseLeave();
      return;
    }
    setTip({is: true, x: e.clientX - progressCoord.x});
  }

  return (
    <>
      {!film
          ? <>
              <div className='player-loading'>
                <Header page={Pages.ADD_REVIEW} />
                <h1 style={{color: 'white'}}>Loading...</h1>
              </div>
            </>
          : <div className="player" onMouseMove={onMouseMove} onMouseUp={onMouseUp} >
              <video src={film.videoLink} className="player__video" poster="img/player-poster.jpg" width='160' height='90' autoPlay ref={playerRef}
              onTimeUpdate={onTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}/>
              <button onClick={onExitClick} type="button" className="player__exit unselectable" >Exit</button>
              <div className="player__controls" >
                <div className="player__controls-row" >
                  <div className="player__time" ref={progressRef} style={{padding: '5px 0', cursor: 'pointer'}}
                    onMouseDown={onProgressMouseDown}
                    onMouseEnter={onProgressMouseEnter}
                    onMouseMove={onProgressMouseMove}
                    onMouseLeave={onProgressMouseLeave}
                    >
                    {tip.is && <span className="player-tip" style={{left:`${(tip.x / progressCoord.width) * 100}%`}}>{formatTime(Math.floor((tip.x / progressCoord.width) * duration))}</span>}
                    <progress className="player__progress" value={progressValue} max={100} />
                    <div className="player__toggler" style={{left: `${progressValue}%`}}
                      onDragStart={(e) =>e.preventDefault()} >Toggler</div>
                  </div>
                  <div className="player__time-value unselectable">{timeLeft}</div>
                </div>
                <div className="player__controls-row">
                  <button onClick={onPlayClick} type="button" className="player__play">
                    <svg viewBox="0 0 19 19" width={19} height={19}>
                      <use xlinkHref={isPlaying ? '#pause' : '#play-s'} />
                    </svg>
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <div className="player__name unselectable">Transpotting</div>
                  <button onClick={onFullClick} type="button" className="player__full-screen">
                    <svg viewBox="0 0 27 27" width={27} height={27}>
                      <use xlinkHref="#full-screen" />
                    </svg>
                    <span>Full screen</span>
                  </button>
                </div>
              </div>
            </div>}
    </>
  );
};
export default Player;
