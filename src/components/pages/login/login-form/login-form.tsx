import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {login} from '../../../../store/slices/user-slice';
import {useAppDispatch} from '../../../../store/store';
import {UserPost} from '../../../../types/user';

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
                {errors.email && <i style={{color: `red`}}>Email is not valid</i>}
                <input className="sign-in__input" type="email" placeholder="Email address"
                  {...register(`email`, {pattern: /^\S+@\S+\.\S+$/, maxLength: 256, required: true})}
                  id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password"
                  {...register(`password`, {required: true})} id="user-password" />
                {errors.password && <i style={{color: `red`}}>Password is required</i>}
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
