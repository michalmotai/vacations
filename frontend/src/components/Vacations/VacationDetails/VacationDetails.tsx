import React, { FC, useEffect, useState } from 'react';
import styles from './VacationDetails.module.scss';
import Vacation from '../../../models/Vacation';
import { format, isValid } from 'date-fns';
import Button from '../../ui-components/Button/Button';
import { NavLink, useParams } from 'react-router-dom';
import { deleteVacation, getVacationsById } from '../../../fetch';
import { onDeleteVaction } from '../vacationsSlice';

interface VacationDetailsProps {}

const VacationDetails: FC<VacationDetailsProps> = () => {
  const [selectedVacation, setselectedVacation] = useState<
    Vacation | undefined
  >();

  const { vacationId } = useParams();

  useEffect(() => {
    if (vacationId) {
      getVacationsById(+vacationId).then((vacation) => {
        setselectedVacation(vacation);
      });
    }
  }, []);

  useEffect(() => {
    try {
      if (vacationId) {
        deleteVacation(+vacationId).then(() => {
          onDeleteVaction(+vacationId);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!selectedVacation) {
    return <div>Loading...</div>; // Add loading state if necessary
  }

  const { destination, description, startDate, endDate, price, photoName } =
    selectedVacation;

  const formattedStartDate = isValid(new Date(startDate))
    ? format(new Date(startDate), 'MM/dd/yyyy')
    : '';
  const formattedEndDate = isValid(new Date(endDate))
    ? format(new Date(endDate), 'MM/dd/yyyy')
    : '';

  return (
    <div className={styles.VacationDetails}>
      <div>
        <img src={photoName} alt="" />
      </div>
      <h3>{destination}</h3>
      <p>{vacationId}</p>
      <p>
        <span>From: {formattedStartDate}</span>
      </p>
      <p>
        <span>To: {formattedEndDate}</span>
      </p>
      <p>{description}</p>
      <p>price: {price}</p>
      <Button key={vacationId} text="LIKE" icon={<>&#x2764;</>} />
      <br />
      <NavLink to={`/vacations/edit/${vacationId}`}>
        <Button text="Edit Item" />
      </NavLink>
      <button
        onClick={() => {
          deleteVacation(+vacationId!);
        }}>
        Delete{' '}
      </button>
      <Button text={'Like'}></Button>
      <br />
    </div>
  );
};

export default VacationDetails;
