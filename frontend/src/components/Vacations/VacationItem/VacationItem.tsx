import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../models/Vacation';
import { format } from 'date-fns';
import { NavLink, useParams } from 'react-router-dom';
import Button from '../../ui-components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  setLikedVacations,
  userLikedVacation,
  userUnlikeVacation,
} from '../../../auth/authSlice';
import { onLikedVacation, onUnLikedVacation } from '../vacationsSlice';
import {
  addLikeToVacationAsync,
  deleteLikeToVacationAsync,
  getVacationLikedByUserIdAsync,
  isLikedAsync,
} from '../../../fetch/likes';

interface VacationItemProps {
  vacation: Vacation;
  likedVacations: Vacation[];
}

const VacationItem: FC<VacationItemProps> = ({ vacation, likedVacations }) => {
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

  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState<boolean>();
  const userId = useAppSelector((state) => state.authState.user?.userId);

  useEffect(() => {
    const fetchIsLiked = async () => {
      if (userId) {
        const checkIfLiked = await isLikedAsync(userId, vacationId);
        setIsLiked(checkIfLiked);
      }
    };

    fetchIsLiked();
  }, []);

  const handleLikeClick = async (vacationId: number) => {
    console.log('Like button clicked for vacation ID:', vacationId);

    if (!isLiked) {
      // Update the backend
      await addLikeToVacationAsync(userId!, vacationId);

      // Update the array of liked vacations for the user
      dispatch(userLikedVacation(vacation));

      // Update the local state
      setIsLiked(true);

      //add 1 to the like count for this vacation
      dispatch(onLikedVacation(vacationId));
    } else {
      // Update the backend
      await deleteLikeToVacationAsync(userId!, vacationId);

      // Update the array of liked vacations for the user
      dispatch(userUnlikeVacation(vacation));

      //- 1 to the like count for this vacation
      dispatch(onUnLikedVacation(vacationId));

      // Update the local state
      setIsLiked(false);
    }
  };

  const renderLikeButton = () => {
    console.log('isLiked', isLiked);
    return isLiked ? (
      <Button
        key={vacationId}
        text="LIKED"
        icon={<>&#x2764;</>}
        onClick={() => handleLikeClick(vacationId)}
      />
    ) : (
      <Button
        key={vacationId}
        text="LIKE"
        onClick={() => handleLikeClick(vacationId)}
      />
    );
  };

  const formattedStartDate = format(new Date(startDate), 'MM/dd/yyyy');
  const formattedEndDate = format(new Date(endDate), 'MM/dd/yyyy');

  return (
    <div className={styles.VacationItem} key={vacationId}>
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
        <div>
          <img src={photoName} alt="" />
        </div>
        {/* <p>{description}</p> */}
        <p>price: {price}</p>
        <p>likes: {likesCount}</p>

        <br />
        <NavLink to={`/vacations/${vacationId}`}>
          <Button key={vacationId} text="Details" />
        </NavLink>
        <br />
        {renderLikeButton()}
      </div>
    </div>
  );
};

export default VacationItem;
