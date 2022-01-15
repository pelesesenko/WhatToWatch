import React, {FC} from 'react';
import Logo from '../logo/logo';

interface Props {
  main?: true,
}

const Footer:FC<Props> = ({main}) => {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Logo withLink={!main}/>
      </div>
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
