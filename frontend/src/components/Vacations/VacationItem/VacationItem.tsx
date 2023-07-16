import React, { FC } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../models/Vacation';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { BASE_API_URL } from '../../../config';
import VacationButtons from '../VacationButtons/VacationButtons';
import LikeButton from '../LikeButton/LikeButton';
import User from '../../../models/User';

interface VacationItemProps {
  vacation: Vacation;
  user: User;
}

const VacationItem: FC<VacationItemProps> = ({ vacation, user }) => {
  const {
    vacationId,
    destination,
    description,
    startDate,
    endDate,
    price,
    photoName,
    likesCount,
  } = vacation;

  const userId = useAppSelector((state) => state.authState.user?.userId);

  const formattedStartDate = format(new Date(startDate), 'MM/dd/yyyy');
  const formattedEndDate = format(new Date(endDate), 'MM/dd/yyyy');
  const imgSrc = `${BASE_API_URL}/vacations/images/${photoName}`;

  //console.log('Vacation in VacationItem: ', vacation);

  return (
    <div className={styles.VacationItem} key={vacationId}>
      <h3>{destination}</h3>

      <div className={styles.VacationItem__container}>
        <div className={styles.VacationItem__containerInput}>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>{vacationId}</td>
              </tr>

              <tr>
                <td>From:</td>
                <td>{formattedStartDate}</td>
              </tr>

              <tr>
                <td>To:</td>
                <td>{formattedEndDate}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{price}</td>
              </tr>
              <tr>
                <td>Likes:</td>
                <td>{likesCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <img src={imgSrc} alt="" className={styles.VacationItem__photo} />
      </div>

      <div className={styles.VacationItem__buttonGroup}>
        {user && user.role === 'user' && (
          <LikeButton vacation={vacation} userId={userId!} />
        )}
        {<VacationButtons vacation={vacation} vacationId={vacationId} />}
      </div>
    </div>
  );
};

export default VacationItem;
