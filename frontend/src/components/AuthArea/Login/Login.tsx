import React, { FC, useState } from 'react';
import styles from './Login.module.scss';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import { useForm } from 'react-hook-form';
import Credentials from '../../../models/Credentials';
import Button from '../../ui-components/Button/Button';
import { loginAsync } from '../../../fetch/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { login } from '../../../auth/authSlice';
import ModalContainer from '../../ui-components/ModalContainer/ModalContainer';
import validate from '../validate';
import Alert from '../../ui-components/Alert/Alert';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { register, handleSubmit, formState } = useForm<Credentials>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const loginHandler = async (Credentials: Credentials) => {
    try {
      const token = await loginAsync(Credentials);

      // Set the state
      dispatch(login(token));
      alert('Welcome back');
      navigate('/');
    } catch (error: any) {
      console.log('error', error);
      setError(error);
      setShowError(true);
    }
  };

  return (
    <ModalContainer disableOverlayClick={true}>
      {error && showError && (
        <Alert error={error} onClose={() => setShowError(false)} />
      )}
      <div className={styles.Login}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(loginHandler)}>
          <FormInputGroupWithError error={formState.errors.email?.message}>
            <label>Email</label>
            <input type="mail" {...register('email', validate.email)} />
          </FormInputGroupWithError>

          <FormInputGroupWithError error={formState.errors.password?.message}>
            <label>Password</label>
            <input
              type="password"
              {...register('password', validate.password)}
            />
          </FormInputGroupWithError>

          <Button text={'Login'}></Button>
        </form>
        <p>Don't have an account?</p>
        <NavLink to={'/register'}>Register Now</NavLink>
      </div>
    </ModalContainer>
  );
};

export default Login;
