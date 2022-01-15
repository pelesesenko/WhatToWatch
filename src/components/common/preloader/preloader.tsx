import React, {FC} from 'react';
import styles from './preloader.module.css';

interface Props {
  backgroundColor? : string;
}
const Preloader:FC<Props> = ({backgroundColor = '#180202'}) => {

  return (
    <div className={styles.wrapper} style={{backgroundColor}}>
      <div className={styles.spinner}>
        <div className={styles.marker}></div>
      </div>
    </div>
  );
};
export default Preloader;
