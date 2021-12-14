import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import { fetchFilmPromo, fetchFilms, selectFilmsLoadingStatus, selectFilmsPromoId,  } from '../../../../store/slices/films-slice';
import Header from '../../../common/header/header';
import {Pages} from '../../../../constants';
import Footer from '../../../common/footer';
import FilmCardList from '../../../common/film-card-list/film-card-list';
import { useDispatch, useSelector } from 'react-redux';
// import { AppStateType } from '../../../store/store';
// import { selectIsCatalogLoaded, selectFilmIdsByGenre, selectAllFilmIds } from '../../../../store/selectors';
// import {ActionCreators as FilmsActionCreators} from '../../../../store/redusers/main/catalog'
import { mockFilms } from '../../../../store/mock';
import FilmCatalog from './film-catalog';
import MainHeader from './main-header';


const Main:FC = () => {

  const dispatch = useAppDispatch();
  const isCatalogLoaded = useAppSelector(selectFilmsLoadingStatus);
  const promoId = useAppSelector(selectFilmsPromoId);

  React.useEffect(() =>{
    if(!promoId) {
      dispatch(fetchFilmPromo())
    }
  },[promoId])

  return (
    <>
      {promoId
        ? <MainHeader promoId={promoId} />
        : <h1>Loading...</h1>
      }
      <div className="page-content">
        {isCatalogLoaded
          ? <FilmCatalog />
          : <h1>Loading...</h1>
        }
        <Footer main />
      </div>
    </>
  );
};

export default Main;
