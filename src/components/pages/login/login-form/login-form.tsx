import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {login} from '../../../../store/user/actions';
import {useAppDispatch} from '../../../../store/store';
import {UserPost} from '../../../../types/user';
import {createFormError} from '../../../../utils';
import {FormErrorMessages} from '../../../../constants';

const LoginForm:FC = () => {

  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {errors}} = useForm<UserPost>();

  const onSubmit: SubmitHandler<UserPost> = (user) => {
    dispatch(login(user));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
      <div className="sign-in__fields">
        <div className="sign-in__field">
          {errors.email && createFormError(FormErrorMessages.email)}
          <input className="sign-in__input" type="email" placeholder="Email address" id="user-email"
            {...register('email', {pattern: /^\S+@\S+\.\S+$/, maxLength: 256, required: true})}
          />
          <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
        </div>

        <div className="sign-in__field">
          <input className="sign-in__input" type="password" placeholder="Password" id="user-password"
            {...register('password', {required: true})}
          />
          {errors.password && createFormError(FormErrorMessages.password)}
          <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
};

export default LoginForm;
