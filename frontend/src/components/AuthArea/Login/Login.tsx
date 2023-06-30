import React, { FC } from 'react';
import styles from './Login.module.scss';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import { useForm } from 'react-hook-form';
import Credentials from '../../../models/Credentials';
import Button from '../../ui-components/Button/Button';
import { loginAsync } from '../../../fetch/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { login } from '../../../auth/authSlice';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { register, handleSubmit } = useForm<Credentials>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginHandler = async (Credentials: Credentials) => {
    try {
      const token = await loginAsync(Credentials);

      //set the state
      dispatch(login(token));
      alert('Welcome back');
      navigate('/home');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={styles.Login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(loginHandler)}>
        <FormInputGroupWithError>
          <label>Email</label>
          <input type="mail" {...register('email')} />
        </FormInputGroupWithError>

        <FormInputGroupWithError>
          <label>Password</label>
          <input type="text" {...register('password')} />
        </FormInputGroupWithError>

        <Button text={'Login'}></Button>
      </form>
      Login Component
    </div>
  );
};

export default Login;
