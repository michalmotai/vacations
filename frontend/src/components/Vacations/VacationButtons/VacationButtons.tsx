import React, { FC, useState } from 'react';
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
  const userRole = useAppSelector((state) => state.authState.user?.role);
  const [showEditVacation, setShowEditVacation] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalToggleHandler = () => {
    console.log('edit button clicked');
    setShowEditVacation((prevState: any) => !prevState);
  };

  const deleteVacationHandler = () => {
    if (vacationId)
      deleteVacation(+vacationId)
        .then((success) => {
          if (success) {
            dispatch(onDeleteVacation(Number(vacationId)));
            if (
              window.confirm('Are you sure you want to delete this vacation?')
            ) {
              navigate('/home');
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const renderButtonUponLogin = () => {
    if (vacation) {
      if (userRole === 'admin') {
        return (
          <>
            <NavLink to="#" onClick={modalToggleHandler}>
              <Button text={'Edit'}></Button>
            </NavLink>
            <NavLink to="/home" onClick={deleteVacationHandler}>
              <Button text={'Delete'}></Button>
            </NavLink>
            <NavLink to={`/vacations/${vacationId}`}>
              <Button key={vacationId} text="Details" />
            </NavLink>
            {showEditVacation && (
              <EditVacation onClose={modalToggleHandler} vacation={vacation} />
            )}
          </>
        );
      }

      if (userRole === 'user')
        return (
          <NavLink to={`/vacations/${vacationId}`}>
            <Button key={vacationId} text="Details" />
          </NavLink>
        );
    }
  };

  return (
    <div className={styles.VacationButtons}>{renderButtonUponLogin()}</div>
  );
};

export default VacationButtons;
