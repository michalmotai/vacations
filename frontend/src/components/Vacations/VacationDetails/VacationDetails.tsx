import React, { FC, useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { deleteVacation, getVacationsById } from '../../../fetch';
import { onDeleteVacation, setVacation } from '../vacationsSlice';
import Button from '../../ui-components/Button/Button';
import styles from './VacationDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import EditVacation from '../EditVacation/EditVacation';
import { BASE_API_URL } from '../../../config';

interface VacationDetailsProps {}

const VacationDetails: FC<VacationDetailsProps> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ vacationId: string }>();
  const navigate = useNavigate();
  const { vacationId } = params;
  const { vacation, vacations } = useAppSelector(
    (state) => state.vacationsState
  );

  const [showEditVacation, setShowEditVacation] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const modalToggleHandler = () => {
    setShowEditVacation((prevState: any) => !prevState);
  };

  useEffect(() => {
    const id = Number(vacationId);

    //check it there is a vacation with this id
    const existingVacation = vacations.find((v) => v.vacationId === id);

    if (existingVacation) {
      dispatch(setVacation(existingVacation));
      setIsLoading(false);
    } else {
      setIsLoading(true);

      //if there is no vacation it is fetched from server
      getVacationsById(id)
        .then((fetchedVacation) => {
          dispatch(setVacation(fetchedVacation));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [vacations]);

  const renderButtonUponLogin = () => {
    // if admin

    return (
      <>
        <span>|</span>
        <button>
          <NavLink onClick={modalToggleHandler} to="#">
            Edit
          </NavLink>
        </button>
        <button>
          {' '}
          <NavLink onClick={deleteVacationHandler} to="/">
            Delete
          </NavLink>
        </button>

        {/* //if user */}
        <Button key={vacationId} text="LIKE" icon={<>&#x2764;</>} />
      </>
    );
  };

  const deleteVacationHandler = () => {
    if (vacationId)
      deleteVacation(+vacationId)
        .then((success) => {
          if (success) {
            dispatch(onDeleteVacation(Number(vacationId)));
            // Move the alert before the navigation, it will halt execution until the user closes it
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

  const renderVacation = () => {
    if (vacation) {
      const imgSrc = `${BASE_API_URL}/vacations/images/${vacation.photoName}`;
      const formattedStartDate = isValid(new Date(vacation.startDate))
        ? format(new Date(vacation.startDate), 'MM/dd/yyyy')
        : '';
      const formattedEndDate = isValid(new Date(vacation.endDate))
        ? format(new Date(vacation.endDate), 'MM/dd/yyyy')
        : '';

      return (
        <div className={styles.VacationDetails}>
          <div className={styles.VacationDetails__photo}>
            <img src={imgSrc} alt="" />
          </div>
          <h3>{vacation.destination}</h3>
          <p>{vacationId}</p>
          <p>
            <span>From: {formattedStartDate}</span>
          </p>
          <p>
            <span>To: {formattedEndDate}</span>
          </p>
          <p>{vacation.description}</p>
          <p>price: {vacation.price}</p>
        </div>
      );
    } else if (!isLoading) {
      return <div>Vacation not found.</div>;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.VacationDetails}>
      <header>
        <h2>Vacation Details</h2>
      </header>
      <div className={styles.VacationDetails__body}>{renderVacation()}</div>
      <div> {renderButtonUponLogin()}</div>
      {showEditVacation && vacation && (
        <EditVacation onClose={modalToggleHandler} vacation={vacation} />
      )}
    </div>
  );
};

export default VacationDetails;
