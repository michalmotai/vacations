import React, { FC } from 'react';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import { useForm } from 'react-hook-form';
import User from '../../../models/User';
import { registerAsync } from '../../../fetch/auth';
import Button from '../../ui-components/Button/Button';
import * as Auth from '../../../auth/authSlice';
import { useAppDispatch } from '../../../hooks';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const { register, handleSubmit } = useForm<User>();
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
    <div className={styles.Register}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(registrationHandler)}>
        {' '}
        <FormInputGroupWithError>
          <label>First Name</label>
          <input type="text" {...register('firstName')} />
        </FormInputGroupWithError>
        <FormInputGroupWithError>
          <label>Last Name</label>
          <input type="text" {...register('lastName')} />
        </FormInputGroupWithError>
        <FormInputGroupWithError>
          <label>Birthdate</label>
          <input type="date" {...register('birthday')} />
        </FormInputGroupWithError>
        <FormInputGroupWithError>
          <label>Email</label>
          <input type="mail" {...register('email')} />
        </FormInputGroupWithError>
        <FormInputGroupWithError>
          <label>Password</label>
          <input type="text" {...register('password')} />
        </FormInputGroupWithError>
        <Button text={'Register'}></Button>
      </form>
    </div>
  );
};

export default Register;
