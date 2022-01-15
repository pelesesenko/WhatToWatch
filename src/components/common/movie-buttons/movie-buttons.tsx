import React, {FC} from 'react';
import {postFavStatus} from '../../../store/slices/fav-films-slice';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import history from '../../../browser-history';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import {makeLink} from '../../../utilites';
import { selectAuthStatus } from '../../../store/slices/user-slice';


interface Props {
  id: number;
  favStatus: boolean;
}

const MovieButtons:FC<Props> = ({id, favStatus}) => {

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const handleFavClick = () => {
    console.log(authStatus)
    if (!authStatus) return;
    if (authStatus === AuthorizationStatuses.notAuthorized) {
      history.push(AppPaths.LOGIN)
    } else {
      dispatch(postFavStatus({id, status: !favStatus}));
    }
  };
  const handlePlayClick = () => history.push(makeLink(AppPaths.PLAYER, id));
  return (
    <>
      <button onClick={handlePlayClick}className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width={19} height={19}>
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
      <button onClick={handleFavClick} className="btn btn--list movie-card__button" type="button">
        {favStatus
          ?
          <svg viewBox="0 0 18 14" width={18} height={14}>
            <use xlinkHref="#in-list" />
          </svg>
          :
          <svg viewBox="0 0 19 20" width={19} height={20}>
            <use xlinkHref="#add" />
          </svg>}
        <span>My list</span>
      </button>
    </>
  );
};
export default MovieButtons;
