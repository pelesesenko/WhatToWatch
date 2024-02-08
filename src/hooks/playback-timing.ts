import React, {useRef, useState} from 'react';
import {formatTime} from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePlaybackTiming = () => {

  const playerRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState('');
  const [tempProgressValue, setTempProgressValue] = useState<number | undefined>(undefined);
  const [isTimeToggling, setIsTimeToggling] = useState(false);
  const [progressCoord, setProgressCoord] = useState({x: 0, width: 0});
  const [tip, setTip] = useState<{is: boolean, x: number}>({is: false, x: 0});

  const syncProgressCoord = () => {
    if (progressRef.current) {
      const {x, width} = progressRef.current.getBoundingClientRect();
      setProgressCoord({x, width});
    }
  };

  React.useEffect(() => {

    syncProgressCoord();

    window.addEventListener('resize', syncProgressCoord);

    return () => {
      window.removeEventListener('resize', syncProgressCoord);
    };
  }, [progressRef.current]);

  const onTimeUpdate = () => {
    const player = playerRef.current;
    if (player) {
      const time = (player.duration - player.currentTime) ?? 0;
      setTimeLeft(formatTime(Math.floor(time)));
    }
  };

  const onTimeTogglingMouseMove = (e: React.MouseEvent) => {
    if (!isTimeToggling) {
      return;
    }

    const {x, width} = progressCoord;
    const validX = Math.min(Math.max(e.clientX, x), (x + width));
    setTempProgressValue((validX - x) / width);
  };

  const onWrapperMouseUp = () => {
    if (playerRef.current?.duration && tempProgressValue !== undefined) {
      playerRef.current.currentTime = tempProgressValue * playerRef.current.duration;
    }
    setTempProgressValue(undefined);
    setIsTimeToggling(false);
  };

  const onProgressMouseDown = (e: React.MouseEvent) => {
    const {x, width} = progressCoord;
    const progress = (e.clientX - x) / width;
    setTempProgressValue(progress);
    if (playerRef.current?.duration) {
      playerRef.current.currentTime = progress * playerRef.current.duration;
    }
    setIsTimeToggling(true);
  };

  const onProgressMouseEnter = (e: React.MouseEvent) => {
    setTip({is: true, x: e.clientX - progressCoord.x});
  };

  const onProgressMouseLeave = () => {
    setTip({is: false, x: 0});
  };

  const onTipMouseMove = (e: React.MouseEvent) => {
    if (!tip.is) {
      return;
    }

    if (e.clientX < progressCoord.x || e.clientX > (progressCoord.x + progressCoord.width)) {
      onProgressMouseLeave();
      return;
    }
    setTip({is: true, x: e.clientX - progressCoord.x});
  };

  return {
    playerRef,
    progressRef,
    timeLeft,
    tempProgressValue,
    progressCoord,
    tip,
    onTimeUpdate,
    onTimeTogglingMouseMove,
    onWrapperMouseUp,
    onProgressMouseDown,
    onProgressMouseEnter,
    onProgressMouseLeave,
    onTipMouseMove,
    setTimeLeft,
  };
};

export default usePlaybackTiming;
