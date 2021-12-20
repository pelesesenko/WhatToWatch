import React, {FC} from 'react';
import Header from '../../common/header/header';
import {AppPaths, AuthorizationStatuses, Pages} from '../../../constants';
import Footer from '../../common/footer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { login, selectAuthStatus } from '../../../store/slices/user-slice';
import { UserPost } from '../../../types/user';
import { Redirect } from 'react-router-dom';

const Login:FC = () => {
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState : {errors}} = useForm<UserPost>();
  const onSubmit: SubmitHandler<UserPost> = (user) => {
    dispatch(login(user));
  }
  const authStatus = useAppSelector(selectAuthStatus);
  return (
    <>
      {authStatus === AuthorizationStatuses.authorized && <Redirect to={AppPaths.MAIN} />}
      <div className="user-page">
        <Header page={Pages.LOGIN} />
        <div className="sign-in user-page__content">
          <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                {errors.email && <i style={{color: 'red'}}>Email is not valid</i>}
                <input className="sign-in__input" type="email" placeholder="Email address"
                  {...register('email',{pattern: /^\S+@\S+\.\S+$/, maxLength: 256, required: true})}
                  id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password"
                  {...register('password', {required: true})} id="user-password" />
                  {errors.password && <i style={{color: 'red'}}>Password is required</i>}
                <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Login;
