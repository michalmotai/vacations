import React, { FC, useEffect } from 'react';
import styles from './AdminArea.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { onGetLikesPerVacation } from '../Vacations/vacationsSlice';
import { getLikesPerVacation } from '../../fetch/likes';
import Vacation from '../../models/Vacation';

interface AdminAreaProps {}

const AdminArea: FC<AdminAreaProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);

  const renderLikes = () => {
    return vacations.map((vacation) => (
      <p key={vacation.vacationId}>{vacation.likesCount}</p>
    ));
  };

  return (
    <div className={styles.AdminArea}>
      <h1>Display Likes for Vacations</h1>
      {renderLikes()}
    </div>
  );
};

export default AdminArea;
