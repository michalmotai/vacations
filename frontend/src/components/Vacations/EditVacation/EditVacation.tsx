import React, { FC, useEffect, useState } from 'react';
import styles from './EditVacation.module.scss';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import validation from '../AddVacation/validation';
import { useForm, UseFormSetValue } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getVacationsById,
  updateVacation as updateVacationAsync,
} from '../../../fetch';
import { onUpdateVacation, setVacation } from '../vacationsSlice';
import Button from '../../ui-components/Button/Button';
import Modal from '../../ui-components/Modal/Modal';
import { format } from 'date-fns';
import { BASE_API_URL } from '../../../config';

interface EditVacationProps {
  vacation: Vacation;
  onClose: () => void;
}

const EditVacation: FC<EditVacationProps> = ({ vacation, onClose }) => {
  const { register, handleSubmit, formState, setValue } = useForm<Vacation>();
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState('');

  const submitEditVacationHandler = async (vacation: Vacation) => {
    try {
      // Update vacation on the server
      console.log('submitEditVacationHandler: ', vacation);

      const updatedVacation = await updateVacationAsync(vacation);
      console.log('updatedVacation: ', vacation);

      // Update vacation state in slice
      dispatch(onUpdateVacation(updatedVacation));
      console.log('dispatched vacation: ', updatedVacation);
      onClose();
      return updatedVacation;
    } catch (error) {
      console.log('couldnt update vacation');
    }
  };

  useEffect(() => {
    // Populate the form fields with vacation data

    setValue('vacationId', vacation.vacationId);
    setValue('destination', vacation.destination);
    setValue('description', vacation.description);

    // Format the dates before setting their values
    const formattedStartDate = format(
      new Date(vacation.startDate),
      'dd/MM/yyyy'
    );
    const formattedEndDate = format(new Date(vacation.endDate), 'dd/MM/yyyy');

    setValue('startDate', vacation.startDate);
    setValue('endDate', vacation.endDate);
    setValue('price', vacation.price);
    setValue('photoName', vacation.photoName);

    const imgSrc = `${BASE_API_URL}/vacations/images/${vacation.photoName}`;
    setImageUrl(imgSrc);
  }, []);

  return (
    <Modal onClose={onClose}>
      <div className={styles.EditVacation}>
        <h2>Edit vacation</h2>

        <br />
        <form onSubmit={handleSubmit(submitEditVacationHandler)}>
          <img src={imageUrl} alt="Vacation" />
          <br></br>
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
              type="string"
              {...register('startDate', validation.startDate)}
            />
          </FormInputGroupWithError>

          <FormInputGroupWithError error={formState.errors.endDate?.message}>
            <label>endDate</label>
            <input type="string" {...register('endDate', validation.endDate)} />
          </FormInputGroupWithError>

          <FormInputGroupWithError error={formState.errors.price?.message}>
            <label>price</label>
            <input type="number" {...register('price', validation.price)} />
          </FormInputGroupWithError>

          <FormInputGroupWithError error={formState.errors.photo?.message}>
            <label>photo</label>
            <input type="file" accept="image/*" {...register('photo')} />
          </FormInputGroupWithError>

          <Button text={'Apply'}></Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditVacation;
