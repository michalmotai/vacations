import React, { FC, useEffect } from 'react';
import styles from './EditVacation.module.scss';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import validation from '../AddVacation/validation';
import { useForm, UseFormSetValue } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import { useAppDispatch } from '../../../hooks';
import {
  getVacationsById,
  updateVacation as updateVacationAsync,
} from '../../../fetch';
import { onUpdateVacation } from '../vacationsSlice';
import { useParams } from 'react-router-dom';
import Button from '../../ui-components/Button/Button';
import Modal from '../../ui-components/Modal/Modal';

interface EditVacationProps {
  vacation: Vacation;
  onClose: () => void;
}

const EditVacation: FC<EditVacationProps> = ({ vacation, onClose }) => {
  const { register, handleSubmit, formState, setValue } = useForm<Vacation>();
  const dispatch = useAppDispatch();

  const submitEditVacationHandler = (vacation: Vacation) => {
    // Update vacation on the server
    updateVacationAsync(vacation)
      .then((response) => {
        // Update vacation state in slice
        dispatch(onUpdateVacation(vacation));
        onClose();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Populate the form fields with vacation data
    setValue('vacationId', vacation.vacationId);
    setValue('destination', vacation.destination);
    setValue('description', vacation.description);
    setValue('startDate', vacation.startDate);
    setValue('endDate', vacation.endDate);
    setValue('price', vacation.price);
    setValue('photoName', vacation.photoName);
  }, []);

  return (
    <Modal onClose={onClose}>
      <div className={styles.EditVacation}>
        <h2>Edit vacation</h2>

        <br />
        <form onSubmit={handleSubmit(submitEditVacationHandler)}>
          <FormInputGroupWithError
            error={formState.errors.destination?.message}>
            <label>destination</label>
            <input
              type="text"
              {...register('destination', validation.destination)}
            />
          </FormInputGroupWithError>

          <FormInputGroupWithError
            error={formState.errors.description?.message}>
            <label>description</label>
            <input
              type="textarea"
              {...register('description', validation.description)}
            />
          </FormInputGroupWithError>

          <FormInputGroupWithError error={formState.errors.startDate?.message}>
            <label>startDate</label>
            <input
              type="date"
              {...register('startDate', validation.startDate)}
            />
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
            <input
              type="file"
              {...register('photoName', validation.photoName)}
            />
          </FormInputGroupWithError>

          <Button text={'Apply'}></Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditVacation;
