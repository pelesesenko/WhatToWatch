import React, { Fragment } from 'react';
import {AppPaths, FormErrorMessages} from './constants';
import Film from './types/film';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

type anyFunction = (...args: Any) => Any;

export const adaptSnakeToCamel = function f(data: Any): Any {

  const wordAdapter = (word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase();

  const stringAdapter = (string: string) => {
    if (!string.includes('_')) {
      return string;
    }
    const words = string.split('_');
    return words.map((word, i) => i === 0
      ? word.toLowerCase()
      : wordAdapter(word)
    ).join('');
  };

  if (data instanceof Array) {
    return data.map((item) => f(item));
  } else if (data instanceof Object) {
    const result: Any = {};
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof Object) {
        result[stringAdapter(key)] = f(data[key]);
      } else {
        result[stringAdapter(key)] = data[key];
      }
    });
    return result;
  }
  return data;
};

export const addIdParam = function (path: typeof AppPaths[keyof typeof AppPaths], id: number): string {
  return path.replace(':id', id.toString());
};

export const convertRating = (rating: number): string => {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  }
  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }
  if (rating >= 5 && rating < 8) {
    return 'Good';
  }
  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }
  if (rating === 10) {
    return 'Awesome';
  }
  return '';
};

export const tryConvertToInteger = (str: string): number | undefined => {
  const match = str.match(/\d/g) || [];
  return match.length ? +match.join('') : undefined;
};

export const formatRunTime = (min: number): string => {
  const rest = min % 60;
  return `${Math.floor(min / 60)}h ${rest < 10 ? `0${rest}` : rest}m`;
};

export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;
  const strHours = hours < 10 ? `0${hours}` : hours.toString();
  const strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const strSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
  return `${strHours}:${strMinutes}:${strSeconds}`;
};

export const throttle = (fn: anyFunction, delay: number): anyFunction => {

  let isThrottled = false;
  let savedArgs: Any;

  function wrapper(...args: Any) {

    if (isThrottled) {
      savedArgs = args;
      return;
    }

    fn(...args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, delay);
  }

  return wrapper;
};

export const createFormError = (message: FormErrorMessages): JSX.Element => (
  <i style={{color: 'red'}}>
    {message}
  </i>
);

export const formatStarring = (film: Film): (string | JSX.Element)[] => film.starring.map((name, i, arr) => (
  i < arr.length - 1
    ? <Fragment key={name}>{name},<br/></Fragment>
    : name
));

export const secureLink = (httpLink: string):string => httpLink.replace('http://', 'https://');

