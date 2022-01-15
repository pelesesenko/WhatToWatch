import React, {FC} from 'react';
import Header from '../../common/header/header';
import {Pages} from '../../../constants';
import Footer from '../../common/footer/footer';
import styles from './not-found.module.css';


const NotFound:FC = () => {
  return (
    <>
      <Header page={Pages.NOT_FOUND} />
      <h1 className={styles.content}>Page not found</h1>
      <Footer />
    </>
  );
};
export default NotFound;
