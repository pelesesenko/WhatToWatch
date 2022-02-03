import React, {FC, useRef, useState} from 'react';
import history from '../../../browser-history';
import {AppPaths, Pages} from '../../../constants';
import withExtractIdParam from '../../../hocs/withExtractParam';
import useLoadFilmById from '../../../hooks/load-film-by-id';
import {addIdParam, throttle} from '../../../utils';
import Header from '../../common/header/header';
import Icon, {IconProps} from '../../common/icon/icon';
import Preloader from '../../common/preloader/preloader';
import './player.css';

interface Props {
  id: number;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;
  const strHours = hours < 10 ? `0` + hours : hours + ``;
  const strMinutes = minutes < 10 ? `0` + minutes : minutes + ``;
  const strSeconds = seconds < 10 ? `0` + seconds : seconds + ``;
  return strHours + `:` + strMinutes + `:` + strSeconds;
};

const Player:FC<Props> = ({id}) => {

  const film = useLoadFilmById(id, false);

  const playerRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(``);
  const [tempProgressValue, setTempProgressValue] = useState<number | undefined>(undefined);
  const [progressCoord, setProgressCoord] = useState({x: 0, width: 0});
  const [tip, setTip] = useState<{is: boolean, x: number}>({is: false, x: 0});
  const [isFullState, setIsFullState] = useState(false);
  const [isControls, setIsControls] = useState(true);
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);

  const isFullElement = () => (Boolean(document.fullscreenElement));

  const syncProgressCoord = () => {
    if (progressRef.current) {
      const {x, width} = progressRef.current.getBoundingClientRect();
      setProgressCoord({x, width});
    }
  };

  const syncIsFullState = () => {
    if (isFullState !== isFullElement()) {
      setIsFullState(isFullElement());
    }
  };

  const syncFullElement = () => {
    if (isFullState === isFullElement()) {
      return;
    }
    if (isFullState) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const startControlsTimer = () => {
    setControlsTimer(setTimeout(() => setIsControls(false), 1500));
  };

  const showControls = () => {
    if (!isControls) {
      setIsControls(true);
    }
    if (controlsTimer) {
      clearTimeout(controlsTimer);
    }
  };

  React.useLayoutEffect(() => {

    syncProgressCoord();
    syncFullElement();

    if (isFullState) {
      if (controlsTimer === null) {
        startControlsTimer();
      }
    } else {
      showControls();
      if (controlsTimer) {
        setControlsTimer(null);
      }
    }

    if (film === undefined) {
      setIsPlaying(false);
    } else {
      setTimeLeft(formatTime(film.runTime * 60));
    }

    window.addEventListener(`resize`, syncProgressCoord);
    document.addEventListener(`fullscreenchange`, syncIsFullState);

    return () => {
      window.removeEventListener(`resize`, syncProgressCoord);
      document.removeEventListener(`fullscreenchange`, syncIsFullState);
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
    };
  }, [film, playerRef.current, isFullState]);

  const onPlayClick = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
  };

  const onExitClick = () => {
    if (history.length > 2) {
      history.goBack();
      return;
    }
    history.push(addIdParam(AppPaths.FILM, id));
  };

  const onFullClick = () => setIsFullState((state) => !state);

  const onTimeUpdate = () => {
    if (playerRef.current) {
      setTimeLeft(formatTime(Math.floor(playerRef.current.duration - playerRef.current.currentTime)));
    }
  };

  const onPageMouseMove = throttle((e: React.MouseEvent) => {

    if (isFullState) {
      setIsControls(true);
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
      startControlsTimer();
    }

    if (tempProgressValue === undefined) {
      return;
    }

    const {x, width} = progressCoord;
    let eventX = e.clientX < x ? x : e.clientX;
    eventX = eventX > (x + width) ? (x + width) : eventX;
    setTempProgressValue((eventX - x) / width * 100);
  }, 200
  );

  const onPageMouseUp = () => {
    if (playerRef.current?.duration && tempProgressValue !== undefined) {
      playerRef.current.currentTime = tempProgressValue * playerRef.current.duration / 100;
      setTempProgressValue(undefined);
    }
  };

  const onProgressMouseDown = (e: React.MouseEvent) => {
    const {x, width} = progressCoord;
    const percentProgress = (e.clientX - x) / width * 100;
    setTempProgressValue(percentProgress);
    if (playerRef.current?.duration) {
      playerRef.current.currentTime = percentProgress / 100 * playerRef.current.duration;
    }
  };

  const onProgressMouseEnter = (e: React.MouseEvent) => {
    setTip({is: true, x: e.clientX - progressCoord.x});
  };

  const onProgressMouseLeave = () => {
    setTip({is: false, x: 0});
  };

  const onProgressMouseMove = throttle((e: React.MouseEvent) => {
    if (!tip.is) {
      return;
    }

    if (e.clientX < progressCoord.x || e.clientX > (progressCoord.x + progressCoord.width)) {
      onProgressMouseLeave();
      return;
    }
    setTip({is: true, x: e.clientX - progressCoord.x});
  }, 200
  );

  const calcProgressValue = (playerRef.current && playerRef.current.duration) ?
    Math.floor(playerRef.current.currentTime / playerRef.current.duration * 10000) / 100 : 0;
  const progressValue = tempProgressValue ?? calcProgressValue;

  const playIconProps = isPlaying ? IconProps.pause : IconProps.play;
  const fullIconProps = isFullState ? IconProps.exitFullScreen : IconProps.fullScreen;
  const hideStyle = isControls ? {} : {display: `none`};
  const runtime = playerRef.current?.duration || 0;
  const tipTime = formatTime(Math.floor((tip.x / progressCoord.width) * runtime));

  return (
    <>
      {!film
        ? <>
          <div className='player-loading'>
            <Header page={Pages.ADD_REVIEW} />
            <Preloader />
          </div>
        </>
        : <div className="player"
          onMouseMove={onPageMouseMove}
          onMouseUp={onPageMouseUp}
        >
          <video className="player__video" poster="img/player-poster.jpg" width='160' height='90'
            src={film.videoLink}
            autoPlay
            ref={playerRef}
            onTimeUpdate={onTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <button type="button" className="player__exit unselectable"
            style={hideStyle}
            onClick={onExitClick}
          >
              Exit
          </button>
          <div className="player__controls"
            style={hideStyle}
          >
            <div className="player__controls-row" >
              <div className="player__time" ref={progressRef}
                style={{padding: `5px 0`, cursor: `pointer`}}
                onMouseDown={onProgressMouseDown}
                onMouseEnter={onProgressMouseEnter}
                onMouseMove={onProgressMouseMove}
                onMouseLeave={onProgressMouseLeave}
              >
                {tip.is && <span className="player-tip unselectable" style={{left: `${(tip.x / progressCoord.width) * 100}%`}}>
                  {tipTime}
                </span>
                }
                <progress className="player__progress" value={progressValue} max={100} />
                <div className="player__toggler"
                  style={{left: `${progressValue}%`}}
                  onDragStart={(e) =>e.preventDefault()}
                >
                    Toggler
                </div>
              </div>
              <div className="player__time-value unselectable">{timeLeft}</div>
            </div>
            <div className="player__controls-row">
              <button type="button" className="player__play"
                onClick={onPlayClick}
              >
                <Icon {...playIconProps} />
                <span>{isPlaying ? `Pause` : `Play`}</span>
              </button>
              <div className="player__name unselectable">Transpotting</div>
              <button type="button" className="player__full-screen"
                onClick={onFullClick}
              >
                <Icon {...fullIconProps} />
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default withExtractIdParam(Player);
