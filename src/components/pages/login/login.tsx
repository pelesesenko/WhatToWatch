import React, {FC} from 'react';
import {Redirect} from 'react-router-dom';
import {AppPaths, AuthorizationStatuses, Pages} from '../../../constants';
import {loginBackUrl} from '../../../services/session-storage';
import {useAppSelector} from '../../../store/store';
import {selectAuthStatus} from '../../../store/user/selectors';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import LoginForm from './login-form/login-form';

const Login:FC = () => {

  const authStatus = useAppSelector(selectAuthStatus);

  const backUrl = loginBackUrl.get() || AppPaths.MAIN;

  React.useEffect(() => {
    return () => {
      loginBackUrl.clear();
    };
  }, []);

  if (authStatus === AuthorizationStatuses.authorized) {
    return <Redirect to={backUrl} />;
  }

  return (
    <div className="user-page">
      <Header page={Pages.LOGIN} />
      <div className="sign-in user-page__content">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
