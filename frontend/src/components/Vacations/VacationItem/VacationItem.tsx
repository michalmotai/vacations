import React, { FC, useEffect } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../models/Vacation';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { BASE_API_URL } from '../../../config';
import VacationButtons from '../VacationButtons/VacationButtons';
import LikeButton from '../LikeButton/LikeButton';
import User from '../../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'; // Replace 'IconName' with the specific icon you want to use

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
    // likesCount,
  } = vacation;

  // Get the likes count from the Redux store
  const likesCount = useAppSelector(
    (state) =>
      state.vacationsState.vacations.find(
        (v) => v.vacationId === vacation.vacationId
      )?.likesCount
  );

  const userId = useAppSelector((state) => state.authState.user?.userId);

  const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
  const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy');
  const imgSrc = `${BASE_API_URL}/vacations/images/${photoName}`;

  //console.log('Vacation in VacationItem: ', vacation);

  return (
    <div className={styles.VacationItem} key={vacationId}>
      <div className={styles.VacationItem__container}>
        <img src={imgSrc} alt="" className={styles.VacationItem__photo} />

        <h2>{destination}</h2>

        <div className={styles.VacationItem__containerInput}>
          <div className="hidden">{vacationId}</div>

          <div className={styles.VacationItem__vacationInfo}>
            <div className={styles.VacationItem__dateContainter}>
              <span className={styles.VacationItem__label}>From:</span>
              <span className={styles.VacationItem__date}>
                {formattedStartDate}
              </span>
            </div>

            <div className={styles.VacationItem__dateContainter}>
              <span className={styles.VacationItem__label}>To:</span>
              <span className={styles.VacationItem__date}>
                {formattedEndDate}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.VacationItem__description}>{description}</div>

        <div className={styles.VacationItem__price}>
          <span className={styles.VacationItem__label}>Price:</span>
          <span className="price">${price}</span>
        </div>
        <div className={styles.VacationItem__likes}>
          <FontAwesomeIcon icon={faHeart} />
          <span className="likes">&nbsp;{likesCount}</span>
        </div>
      </div>

      <div className={styles.VacationItem__buttonGroup}>
        {user && user.role === 'user' && (
          <div className={styles.VacationItem__likeButton}>
            <LikeButton vacation={vacation} userId={userId!} />
          </div>
        )}
        {<VacationButtons vacation={vacation} vacationId={vacationId} />}
      </div>
    </div>
  );
};

export default VacationItem;
