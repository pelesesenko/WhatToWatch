import {useEffect, useState} from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFullScreen = () => {

  const [isFull, setIsFull] = useState(false);

  const isFullElement = () => (Boolean(document.fullscreenElement));
  const [isControls, setIsControls] = useState(true);
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);

  const syncIsFullState = () => {
    if (isFull !== isFullElement()) {
      setIsFull(isFullElement());
    }
  };

  const syncFullElement = () => {
    if (isFull === isFullElement()) {
      return;
    }
    if (isFull) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };


  const showControls = () => {
    if (!isControls) {
      setIsControls(true);
    }
    if (controlsTimer) {
      clearTimeout(controlsTimer);
    }
  };

  const startControlsTimer = () => {
    setControlsTimer(setTimeout(() => setIsControls(false), 1500));
  };

  const onFullClick = () => setIsFull((state) => !state);

  const onFullMouseMove = () => {
    if (isFull) {
      setIsControls(true);
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
      startControlsTimer();
    }
  };

  useEffect(() => {
    syncFullElement();

    if (isFull) {
      if (controlsTimer === null) {
        startControlsTimer();
      }
    } else {
      showControls();
      if (controlsTimer) {
        setControlsTimer(null);
      }
    }

    document.addEventListener(`fullscreenchange`, syncIsFullState);

    return () => {
      if (isFull) {
        document.exitFullscreen();
      }
      document.removeEventListener(`fullscreenchange`, syncIsFullState);
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
    };
  }, [isFull]);

  return {isFull, isControls, onFullClick, onFullMouseMove};
};

export default useFullScreen;
