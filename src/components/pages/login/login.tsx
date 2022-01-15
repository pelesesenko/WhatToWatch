import React, {FC} from 'react';
import Header from '../../common/header/header';
import {AppPaths, AuthorizationStatuses, Pages} from '../../../constants';
import Footer from '../../common/footer/footer';
import {useAppSelector} from '../../../store/store';
import {selectAuthStatus} from '../../../store/slices/user-slice';
import {Redirect} from 'react-router-dom';
import LoginForm from './login-form/login-form';

const Login:FC = () => {

  const authStatus = useAppSelector(selectAuthStatus);

  return (
    <>
      {authStatus === AuthorizationStatuses.authorized && <Redirect to={AppPaths.MAIN} />}
      <div className="user-page">
        <Header page={Pages.LOGIN} />
        <div className="sign-in user-page__content">
          <LoginForm />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Login;
