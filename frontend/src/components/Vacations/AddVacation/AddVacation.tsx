import React, { FC, useCallback, useEffect } from 'react';
import styles from './AddVacation.module.scss';
import { useForm } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import validation from './validation';
import { addVacation } from '../../../fetch';
import { onAddVacation } from '../vacationsSlice';
import { useNavigate } from 'react-router-dom';

interface AddVacationProps {}

const AddVacation: FC<AddVacationProps> = () => {
  const { register, handleSubmit, formState } = useForm<Vacation>();

  const submitAddVacationHandler = async (vacation: Vacation) => {
    vacation.vacationId = +vacation.vacationId;
    await addVacationAsync(vacation);
  };

  const addVacationAsync = useCallback(async (vacation: Vacation) => {
    try {
      console.log(vacation);
      await addVacation(vacation);
      // navigate('/');
      onAddVacation(vacation);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const submitAddVacationHandler = useCallback(async (vacation: Vacation) => {
  //   try {
  //     console.log(vacation);
  //     await addVacation(vacation).then((addedVacation) => {
  //       onAddVacation(addedVacation); //set the state
  //       console.log('addedVacation:', addedVacation);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div className={styles.AddVacation}>
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
