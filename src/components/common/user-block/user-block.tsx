import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { AppPaths, AuthorizationStatuses } from '../../../constants';
import { logout, selectAuthStatus, selectUser } from '../../../store/slices/user-slice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import styles from './user-block.module.css';

const UserBlock:FC = () => {

  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const onLogout = () => dispatch(logout());

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
          <button onClick={onLogout} className={`button ${styles.logout}`}
            style={{marginLeft: `30px`, backgroundColor: `transparent`, border: `none`, cursor: `pointer`}}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#eee5b5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1={21} y1={12} x2={9} y2={12} />
            </svg>
          </button>
        </>
        :
        <Link to={AppPaths.LOGIN} className="user-block__link">Sign in</Link>
      }
    </div>
  );
};
export default UserBlock;
