import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppPaths, AuthorizationStatuses} from '../../../constants';
import {loginBackUrl} from '../../../services/session-storage';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {logout} from '../../../store/user/actions';
import {selectAuthStatus, selectUser} from '../../../store/user/selectors';
import LogoutBtn from '../logout-btn/logout-btn';
import styles from './user-block.module.css';

const UserBlock:FC = () => {

  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const onLogout = () => dispatch(logout());
  const onSignIn = () => loginBackUrl.set();

  return (
    <div className={`user-block ${styles.wrapper}`} >
      {authStatus === AuthorizationStatuses.authorized
        ?
        <>
          <div className="user-block__avatar" >
            <Link to={AppPaths.MY_LIST}>
              <img src={user?.avatarUrl} alt="User avatar" width={63} height={63} />
            </Link>
          </div>
          <LogoutBtn onClick={onLogout} />
        </>
        :
        <Link onClick={onSignIn} to={AppPaths.LOGIN} className="user-block__link">Sign in</Link>}
    </div>
  );
};

export default UserBlock;
