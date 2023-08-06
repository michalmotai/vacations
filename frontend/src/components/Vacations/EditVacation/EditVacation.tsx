import React, { FC, useEffect, useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateVacation as updateVacationAsync } from '../../../fetch';
import { onUpdateVacation } from '../vacationsSlice';
import { BASE_API_URL } from '../../../config';
import FormInputGroupWithError from '../../FormInputGroupWithError/FormInputGroupWithError';
import validation from '../AddVacation/validation';
import Button from '../../ui-components/Button/Button';
import { NavLink } from 'react-router-dom';
import styles from './EditVacation.module.scss';
import { format } from 'date-fns';

interface EditVacationProps {}

const EditVacation: FC<EditVacationProps> = () => {
  const { register, handleSubmit, formState, setValue } = useForm<Vacation>();
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const { vacation } = useAppSelector((state) => state.vacationsState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, serErrorMessage] = useState<string>('');
  // const [dates, setDates] = useState({ startDate: '', endDate: '' });

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const submitEditVacationHandler = async (vacation: Vacation) => {
    try {
      // Update vacation on the server

      // console.log('submitEditVacationHandler: ', vacation);

      const updatedVacation = await updateVacationAsync(vacation);
      // console.log('updatedVacation: ', updatedVacation);

      // Update vacation state in slice
      dispatch(onUpdateVacation(updatedVacation));
      console.log('dispatched vacation: ', updatedVacation);
      serErrorMessage('');

      return updatedVacation;
    } catch (error: any) {
      console.log(error.response.data);
      // Handle errors from the server
      const errorMessage =
        error?.response?.data || 'An unknown error occurred.';
      serErrorMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (vacation) {
      // Populate the form fields with vacation data

      setValue('vacationId', vacation.vacationId);
      setValue('destination', vacation.destination);
      setValue('description', vacation.description);
      setValue('startDate', vacation.startDate);
      setValue('endDate', vacation.endDate);
      setValue('price', vacation.price);
      setValue('photoName', vacation.photoName);

      // const formattedStartDate = format(
      //   new Date(vacation.startDate),
      //   'dd-MM-yyyy'
      // );
      // const formattedEndDate = format(new Date(vacation.endDate), 'dd-MM-yyyy');
      // setDates({ startDate: formattedStartDate, endDate: formattedEndDate });

      const imgSrc = `${BASE_API_URL}/vacations/images/${vacation.photoName}`;
      setImageUrl(imgSrc);
    }
  }, [vacation]);

  return (
    <div className={styles.EditVacation}>
      <img src={imageUrl} alt="Vacation" />
      <h2>Edit vacation</h2>

      <form onSubmit={handleSubmit(submitEditVacationHandler)}>
        <FormInputGroupWithError error={formState.errors.destination?.message}>
          <label>Destination:</label>
          <input
            type="text"
            {...register('destination', validation.destination)}
          />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.description?.message}>
          <label>Description:</label>
          <input
            type="textarea"
            {...register('description', validation.description)}
          />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.startDate?.message}>
          <label>Start date:</label>
          {/* Use defaultValue to set the default value for the input field */}
          <input type="text" {...register('startDate', validation.startDate)} />
        </FormInputGroupWithError>
        {/* <input type="text" defaultValue={dates.startDate} /> */}

        <FormInputGroupWithError error={formState.errors.endDate?.message}>
          <label>End date:</label>
          <input type="text" {...register('endDate', validation.endDate)} />
        </FormInputGroupWithError>
        {/* <input type="text" defaultValue={dates.endDate} /> */}

        <FormInputGroupWithError error={formState.errors.price?.message}>
          <label>Price:</label>
          <input type="number" {...register('price', validation.price)} />
        </FormInputGroupWithError>

        <FormInputGroupWithError error={formState.errors.photo?.message}>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            {...register('photo')}
            onChange={handleFileInputChange}
          />
        </FormInputGroupWithError>
        <div className={styles.EditVacation__serverErrorMessage}>
          {/* Display the error message */}
          {errorMessage && <div>Error: {errorMessage}</div>}
        </div>

        <div className={styles.EditVacation__buttonsContainer}>
          <Button text={'Apply'}></Button>
          <NavLink to={'/'}>
            <Button text={'Cancel'}></Button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default EditVacation;
