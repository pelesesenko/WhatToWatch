import React, {FC} from 'react';
import {fetchFilmPromo} from '../../../../store/films/actions';
import {selectFilmsPromoId} from '../../../../store/films/selectors';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import Footer from '../../../common/footer/footer';
import Preloader from '../../../common/preloader/preloader';
import MainCatalog from './main-catalog/main-catalog';
import MainHeader from './main-header/main-header';


const Main1:FC = () => {

  const dispatch = useAppDispatch();
  const promoId = useAppSelector(selectFilmsPromoId);

  React.useEffect(() =>{
    if (!promoId) {
      dispatch(fetchFilmPromo());
    }
  }, [promoId]);

  return (
    <>
      {promoId
        ? <MainHeader promoId={promoId} />
        : <Preloader />
      }
      <div className="page-content">
        <MainCatalog />
        <Footer main />
      </div>
    </>
  );
};

export default Main1;
