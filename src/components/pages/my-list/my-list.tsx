import React, {FC} from 'react';
import Header from '../../common/header/header';
import {Pages} from '../../../constants';
import Footer from '../../common/footer';
import FilmCardList from '../../common/film-card-list/film-card-list';

const MyList:FC = () => {
  const myListIds = Array(9).fill(2);
  return (
    <>
      <div className="user-page">
        <Header page={Pages.MY_LIST} />
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmCardList filmIds={myListIds}/>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default MyList;
