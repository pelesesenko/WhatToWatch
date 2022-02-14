import React, {FC} from 'react';
import {postFavStatus} from '../../../store/fav-films/actions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import history from '../../../browser-history';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import {addIdParam} from '../../../utils';
import {selectAuthStatus} from '../../../store/user/selectors';
import Icon, {IconProps} from '../icon/icon';
import {Link} from 'react-router-dom';
import {loginBackUrl, playerBackUrl} from '../../../services/session-storage';


interface Props {
  id: number;
  favStatus: boolean;
  withAddReview?: true;
}

const MovieButtons:FC<Props> = ({id, favStatus, withAddReview}) => {

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  const handleFavClick = () => {
    if (!authStatus) {
      return;
    }
    if (authStatus === AuthorizationStatuses.notAuthorized) {
      loginBackUrl.set();
      history.push(AppPaths.LOGIN);
    } else {
      dispatch(postFavStatus({id, status: !favStatus}));
    }
  };

  const handlePlayClick = () => {
    playerBackUrl.set();
    history.push(addIdParam(AppPaths.PLAYER, id));
  };

  const favIconProps = favStatus ? IconProps.added : IconProps.add;

  return (
    <div className="movie-card__buttons">
      <button className="btn btn--play movie-card__button" type="button"
        onClick={handlePlayClick}
      >
        <Icon {...IconProps.play} />
        <span>Play</span>
      </button>
      <button className="btn btn--list movie-card__button" type="button"
        onClick={handleFavClick}
      >
        <Icon {...favIconProps}/>
        <span>My list</span>
      </button>
      {withAddReview
      && <Link to={addIdParam(AppPaths.ADD_REVIEW, id)} className="btn movie-card__button">Add review</Link>}
    </div>
  );
};

export default MovieButtons;
