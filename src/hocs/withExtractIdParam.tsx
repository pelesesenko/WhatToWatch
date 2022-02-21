import React, {FC} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {AppPaths} from '../constants';

const withExtractIdParam = function<T> (WrappedComponent: FC<T & {id: number}>): FC<T> {

  const Wrapper: FC<T> = (props) => {

    const {id: str} = useParams<{id: string}>();
    const match = str.match(/\d/g) || [];
    const value = match.length ? +match.join(``) : undefined;

    if (value === undefined) {
      return <Redirect to={AppPaths.NOT_FOUND} />;
    }

    return (
      <WrappedComponent id={value} {...props} />
    );
  };

  return Wrapper;
};

export default withExtractIdParam;
