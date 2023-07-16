import React, { FC } from 'react';
import styles from './Register.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import { useForm } from 'react-hook-form';
import User from '../../../models/User';
import { registerAsync } from '../../../fetch/auth';
import Button from '../../ui-components/Button/Button';
import * as Auth from '../../../auth/authSlice';
import { useAppDispatch } from '../../../hooks';
import ModalContainer from '../../ui-components/ModalContainer/ModalContainer';
import validate from '../validate';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const { register, handleSubmit, formState } = useForm<User>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registrationHandler = async (user: User) => {
    try {
      const token = await registerAsync(user);

      //set the state
      dispatch(Auth.register(token));
      console.log(token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalContainer>
      <div className={styles.Register}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(registrationHandler)}>
          {' '}
          <FormInputGroupWithError error={formState.errors.firstName?.message}>
            <label>First Name</label>
            <input type="text" {...register('firstName', validate.firstName)} />
          </FormInputGroupWithError>
          <FormInputGroupWithError error={formState.errors.lastName?.message}>
            <label>Last Name</label>
            <input type="text" {...register('lastName', validate.firstName)} />
          </FormInputGroupWithError>
          <FormInputGroupWithError error={formState.errors.birthday?.message}>
            <label>Birthdate</label>
            <input type="date" {...register('birthday', validate.birthday)} />
          </FormInputGroupWithError>
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
          <Button text={'Register'}></Button>
        </form>
        <p>already registerd?</p>
        <NavLink to="/login">Login</NavLink>
      </div>
    </ModalContainer>
  );
};

export default Register;
