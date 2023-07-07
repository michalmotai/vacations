import React, { FC } from 'react';
import styles from './AdminArea.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { format } from 'date-fns';
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import BarChart from '../BarChart/BarChart';

interface AdminAreaProps {}

const AdminArea: FC<AdminAreaProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);

  Chart.register(CategoryScale, LinearScale, BarElement);

  const renderLikes = () => {
    if (!vacations || vacations.length === 0) {
      return <p>No vacation data</p>;
    }

    return vacations.map((vacation) => (
      <tr key={vacation.vacationId}>
        <td>{vacation.vacationId}</td>
        <td>{vacation.destination}</td>
        <td> {format(new Date(vacation.startDate), 'dd/MM/yyyy')}</td>
        <td>{vacation.likesCount}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.AdminArea}>
      <h1>Display Likes for Vacations</h1>
      <BarChart />
      <table className={styles.AdminArea__table}>
        <thead>
          <tr>
            <th>id</th>
            <th>Destination</th>
            <th>Start date</th>
            <th>Likes Count</th>
          </tr>
        </thead>
        <tbody>{renderLikes()}</tbody>
      </table>
    </div>
  );
};

export default AdminArea;
