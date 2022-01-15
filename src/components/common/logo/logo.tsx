import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '../../../constants';

interface Props {
  withLink: boolean;
}

const Logo:FC<Props> = ({withLink}) => {
  return (
    <>
    {withLink
          ?
          <Link className="logo__link logo__link--light" to={AppPaths.MAIN}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
          :
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>}
    </>
  );
};
export default Logo;
