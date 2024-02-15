import React, {FC, useState} from 'react';
import history from '../../../browser-history';
import {AppPaths, Pages} from '../../../constants';
import withExtractIdParam from '../../../hocs/withExtractIdParam';
import useLoadFilmById from '../../../hooks/load-film-by-id';
import useFullScreen from '../../../hooks/fullscreen';
import {throttle, formatTime, secureLink} from '../../../utils';
import Header from '../../common/header/header';
import Icon, {IconProps} from '../../common/icon/icon';
import Preloader from '../../common/preloader/preloader';
import styles from './player.module.css';
import usePlaybackTiming from '../../../hooks/playback-timing';
import {playerBackUrl} from '../../../services/session-storage';

interface Props {
  id: number;
}

const Player:FC<Props> = ({id}) => {

  const {
    isFull,
    isControls,
    onFullClick,
    onFullMouseMove,
  } = useFullScreen();

  const {
    playerRef,
    progressRef,
    progressCoord,
    tempProgressValue,
    timeLeft,
    tip,
    onTimeUpdate,
    onTimeTogglingMouseMove,
    onWrapperMouseUp,
    onProgressMouseDown,
    onProgressMouseEnter,
    onProgressMouseLeave,
    onTipMouseMove,
    setTimeLeft,
  } = usePlaybackTiming();

  const film = useLoadFilmById(id, false);

  const [isPlaying, setIsPlaying] = useState(true);

  React.useEffect(() => {
    if (film === undefined) {
      setIsPlaying(false);
    } else {
      setTimeLeft(formatTime(film.runTime * 60));
    }
  }, [film]);

  React.useEffect(() => () => playerBackUrl.clear(), []);

  const onPlayClick = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
  };

  const onExitClick = () => history.push(playerBackUrl.get() || AppPaths.MAIN);

  const onWrapperMouseMove = throttle((e: React.MouseEvent) => {
    onFullMouseMove();
    onTimeTogglingMouseMove(e);
  }, 100);

  const onProgressMouseMove = throttle(onTipMouseMove, 100);

  const currentTime = playerRef.current?.currentTime || 0;
  const duration = playerRef.current?.duration || 0;
  const calcProgressValue = (duration) ? Math.floor(currentTime / duration * 100) / 100 : 0;
  const progressValue = (tempProgressValue ?? calcProgressValue) * 100;
  const tipTime = formatTime(Math.floor((tip.x / progressCoord.width) * duration));

  const playIconProps = isPlaying ? IconProps.pause : IconProps.play;
  const fullIconProps = isFull ? IconProps.exitFullScreen : IconProps.fullScreen;
  const hiding = isControls ? '' : ` ${styles.hidden}`;
  const noCursor = isControls ? '' : ` ${styles.cursorNone}`;

  if(!film) {
    return (
      <div className={styles.loading}>
        <Header page={Pages.ADD_REVIEW} />
        <Preloader />
      </div>
    );
  }

  return (
    <div className="player"
      onMouseMove={onWrapperMouseMove}
      onMouseUp={onWrapperMouseUp}
    >
      <video poster="img/player-poster.jpg" width='160' height='90'
        className={`player__video${noCursor}`}
        src={secureLink(film.videoLink)}
        autoPlay
        ref={playerRef}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button type="button"
        className={`player__exit ${styles.unselectable}${hiding}`}
        onClick={onExitClick}
      >
          Exit
      </button>
      <div className={`player__controls${hiding}`}>
        <div className="player__controls-row" >
          <div className={`player__time ${styles.time}`}
            ref={progressRef}
            onMouseDown={onProgressMouseDown}
            onMouseEnter={onProgressMouseEnter}
            onMouseMove={onProgressMouseMove}
            onMouseLeave={onProgressMouseLeave}
          >
            {tip.is &&
              <span className={`${styles.tip} ${styles.unselectable}`}
                style={{left: `${(tip.x / progressCoord.width) * 100}%`}}
                onDragStart={(e) =>e.preventDefault()}
                draggable={false}
              >
                {tipTime}
              </span>}
            <progress className="player__progress" value={progressValue} max={100} />
            <div className={`player__toggler ${styles.unselectable}`}
              style={{left: `${progressValue}%`}}
              onDragStart={(e) =>e.preventDefault()}
              draggable={false}
            >
              Toggler
            </div>
          </div>
          <div className={`player__time-value ${styles.unselectable}`}>
            {timeLeft}
          </div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={onPlayClick}
          >
            <Icon {...playIconProps} />
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className={`player__name ${styles.unselectable}`}>
            Transpotting
          </div>
          <button type="button" className="player__full-screen"
            onClick={onFullClick}
          >
            <Icon {...fullIconProps} />
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withExtractIdParam(Player);
