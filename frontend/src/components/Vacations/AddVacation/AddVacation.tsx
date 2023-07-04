import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './AddVacation.module.scss';
import { useForm } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import validation from './validation';
import { addVacation as addVacationAsync } from '../../../fetch';
import { onAddVacation } from '../vacationsSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import Alert from '../../ui-components/Alert/Alert';

interface AddVacationProps {}

const AddVacation: FC<AddVacationProps> = () => {
  const { register, handleSubmit, formState } = useForm<Vacation>();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);

  const submitAddVacationHandler = useCallback(async (vacation: Vacation) => {
    try {
      console.log(vacation);
      await addVacationAsync(vacation);
      // navigate('/');
      onAddVacation(vacation);
    } catch (error) {
      setShowError(true);
      setError(error);
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.AddVacation}>
      {error && showError && (
        <Alert
          error={'There was a problem with adding the vacation'}
          onClose={() => setShowError(false)}
        />
      )}
      <h2>Add a new vacation</h2>

      <br />
      <form onSubmit={handleSubmit(submitAddVacationHandler)}>
        <FormInputGroupWithError error={formState.errors.destination?.message}>
          <label>destination</label>
          <input
            type="text"
            {...register('destination', validation.destination)}
          />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.description?.message}>
          <label>description</label>
          <input
            type="textarea"
            {...register('description', validation.description)}
          />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.startDate?.message}>
          <label>startDate</label>
          <input type="date" {...register('startDate', validation.startDate)} />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.endDate?.message}>
          <label>endDate</label>
          <input type="date" {...register('endDate', validation.endDate)} />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.price?.message}>
          <label>price</label>
          <input type="number" {...register('price', validation.price)} />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.photoName?.message}>
          <label>photoName</label>
          <input type="file" {...register('photoName', validation.photoName)} />
        </FormInputGroupWithError>

        <button>Add</button>
      </form>
    </div>
  );
};

export default AddVacation;
