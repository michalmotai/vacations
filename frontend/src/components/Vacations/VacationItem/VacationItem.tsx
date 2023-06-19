import React, { FC } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../models/Vacation';
import { format } from 'date-fns';
import { NavLink, useParams } from 'react-router-dom';
import Button from '../../ui-components/Button/Button';
import VacationDetails from '../VacationDetails/VacationDetails';

interface VacationItemProps {
  vacation: Vacation;
}

const VacationItem: FC<VacationItemProps> = ({ vacation }) => {
  const { vacationId, destination, description, startDate, endDate, price } =
    vacation;

  const formattedStartDate = format(new Date(startDate), 'MM/dd/yyyy');
  const formattedEndDate = format(new Date(endDate), 'MM/dd/yyyy');

  const handleLikeClick = () => {};

  return (
    <div className={styles.VacationItem}>
      <div className={styles.VacationItem__vacation}>
        <h3>{destination}</h3>
        <p>{vacationId}</p>
        <p>
          <span>From:</span>
          <span> {formattedStartDate}</span>
        </p>
        <p>
          <span>To:</span>
          <span> {formattedEndDate}</span>
        </p>
        {/* <p>{description}</p> */}
        <p>price: {price}</p>
        <Button key={vacationId} text="LIKE" icon={<>&#x2764;</>} />
        <br />
        <NavLink to={`/vacations/${vacationId}`}>
          <Button text={'Details'} />
        </NavLink>
        <br />
        <NavLink to={`/vacations/edit/${vacationId}`}>
          <Button text="Edit Item" />
        </NavLink>
        <br />
      </div>
    </div>
  );
};

export default VacationItem;
