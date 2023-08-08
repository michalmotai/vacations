import React, { FC, useEffect, useState } from 'react';
import styles from './LikeButton.module.scss';
import Button from '../../ui-components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addLikeToVacationAsync,
  deleteLikeToVacationAsync,
  isLikedAsync,
} from '../../../fetch/likes';
import { userLikedVacation, userUnlikeVacation } from '../../../auth/authSlice';
import Vacation from '../../../models/Vacation';
import { onLikedVacation, onUnLikedVacation } from '../vacationsSlice';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LikeButtonProps {
  vacation: Vacation;
  userId: number;
}

const LikeButton: FC<LikeButtonProps> = ({ vacation, userId }) => {
  const dispatch = useAppDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const { vacationId } = vacation;

  const [isLiked, setIsLiked] = useState<boolean>();
  // const userId = useAppSelector((state) => state.authState.user?.userId);

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
      <button
        key={vacationId}
        onClick={() => handleLikeClick(vacationId)}
        className={styles.LikeButton__isLiked}>
        <FontAwesomeIcon icon={faHeart} /> Liked
      </button>
    ) : (
      <button
        key={vacationId}
        onClick={() => handleLikeClick(vacationId)}
        className={styles.LikeButton__}>
        <FontAwesomeIcon icon={faHeart} /> Like
      </button>
    );
  };
  return <div className={styles.LikeButton}>{renderLikeButton()}</div>;
};

export default LikeButton;
