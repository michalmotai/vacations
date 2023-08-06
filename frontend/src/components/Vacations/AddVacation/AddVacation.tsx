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
import ModalContainer from '../../ui-components/ModalContainer/ModalContainer';
import Alert from '../../ui-components/Alert/Alert';
import Button from '../../ui-components/Button/Button';

interface AddVacationProps {}

const AddVacation: FC<AddVacationProps> = () => {
  const { register, handleSubmit, formState } = useForm<Vacation>();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const submitAddVacationHandler = async (vacation: Vacation) => {
    try {
      console.log('add vacation:', vacation);
      const addedVacation = await addVacationAsync(vacation);
      navigate('/');
      // setVacationPhoto((prevVacation) => ({
      //   ...prevVacation,
      //   photoName: addedVacation.photoName,
      // }));

      dispatch(onAddVacation(addedVacation));
    } catch (error) {
      setShowError(true);
      setError(error);
      console.log(error);
    }
  };

  return (
    <ModalContainer>
      {error && showError && (
        <Alert
          error={error.response?.data?.message}
          onClose={() => setShowError(false)}
        />
      )}
      <div className={styles.AddVacation}>
        <form onSubmit={handleSubmit(submitAddVacationHandler)}>
          <h2>Add a new vacation</h2>

          <br />
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
            <textarea {...register('description', validation.description)} />
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
            <label>photo</label>
            <input type="file" accept="image/*" {...register('photo')} />
          </FormInputGroupWithError>

          <Button text={'Add'}></Button>
          <Alert error={error} onClose={function (): void {}}></Alert>
        </form>
      </div>
    </ModalContainer>
  );
};

export default AddVacation;
