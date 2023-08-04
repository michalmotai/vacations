import React, { FC } from 'react';
import styles from './VacationButtons.module.scss';
import Button from '../../ui-components/Button/Button';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Vacation from '../../../models/Vacation';
import { deleteVacation } from '../../../fetch';
import EditVacation from '../EditVacation/EditVacation';
import { onDeleteVacation, setVacation } from '../vacationsSlice';

interface VacationButtonsProps {
  vacation: Vacation;
  vacationId: number;
}

const VacationButtons: FC<VacationButtonsProps> = ({
  vacation,
  vacationId,
}) => {
  const user = useAppSelector((state) => state.authState.user);
  const userRole = useAppSelector((state) => state.authState.user?.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteVacationHandler = () => {
    deleteVacation(vacationId)
      .then((success) => {
        if (success) {
          dispatch(onDeleteVacation(vacationId));
          if (
            window.confirm('Are you sure you want to delete this vacation?')
          ) {
            navigate('/');
            
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editButtonHandler = () => {
    dispatch(setVacation(vacation));
  };

  const detailsButtonHandler = () => {
    dispatch(setVacation(vacation));
  };

  const renderButtonUponLogin = () => {
    if (!vacation) {
      return null;
    }

    if (userRole === 'admin') {
      return (
        <>
          <NavLink
            to={`/vacations/${vacationId}/edit`}
            onClick={editButtonHandler}>
            <Button text="Edit" />
          </NavLink>
          <NavLink to="/" onClick={deleteVacationHandler}>
            <Button text="Delete" />
          </NavLink>
          <NavLink
            to={`/vacations/${vacationId}`}
            onClick={detailsButtonHandler}>
            <Button key={vacationId} text="Details" />
          </NavLink>
        </>
      );
    } else if (user) {
      return (
        <NavLink to={`/vacations/${vacationId}`} onClick={detailsButtonHandler}>
          <Button key={vacationId} text="Details" />
        </NavLink>
      );
    } else {
      return null; // If not logged in and not an admin, don't render any buttons
    }
  };

  return (
    <div className={styles.VacationButtons}>{renderButtonUponLogin()}</div>
  );
};

export default VacationButtons;
