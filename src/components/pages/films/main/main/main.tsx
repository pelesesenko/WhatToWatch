import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {fetchFilmPromo, selectFilmsLoadingStatus, selectFilmsPromoId} from '../../../../../store/slices/films-slice';
import Footer from '../../../../common/footer/footer';
import MainCatalog from '../main-catalog/main-catalog';
import MainHeader from '../main-header/main-header';
import Preloader from '../../../../common/preloader/preloader';
import { LoadingStatuses } from '../../../../../constants';


const Main:FC = () => {

  const dispatch = useAppDispatch();
  const filmsLoadingStatus = useAppSelector(selectFilmsLoadingStatus);
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
        {filmsLoadingStatus === LoadingStatuses.fulfilled
          ? <MainCatalog />
          : <Preloader />
        }
        <Footer main />
      </div>
    </>
  );
};

export default Main;
