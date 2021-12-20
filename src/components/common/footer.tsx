import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { AppPaths, Pages } from '../../constants';

interface Props {
  main?: true,
}

const Footer:FC<Props> = ({main}) => {
  return (
    <footer className="page-footer">
      <div className="logo">
        {main
          ? <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          : <Link className="logo__link logo__link--light" to={AppPaths.MAIN}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>}

      </div>
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
