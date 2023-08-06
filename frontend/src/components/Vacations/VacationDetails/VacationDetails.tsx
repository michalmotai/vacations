import React, { FC } from 'react';
import { format, isValid } from 'date-fns';
import { useParams } from 'react-router-dom';
import styles from './VacationDetails.module.scss';
import { useAppSelector } from '../../../hooks';
import { BASE_API_URL } from '../../../config';
import VacationButtons from '../VacationButtons/VacationButtons';
import LikeButton from '../LikeButton/LikeButton';

interface VacationDetailsProps {}

const VacationDetails: FC<VacationDetailsProps> = () => {
  const { vacationId } = useParams<{ vacationId: string }>();
  const { vacation } = useAppSelector((state) => state.vacationsState);
  const { user } = useAppSelector((state) => state.authState);

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
        <>
          <div className={styles.VacationDetails__photo}>
            <img src={imgSrc} alt="" />
          </div>
          <div className={styles.VacationDetails__container}>
            <h2>{vacation.destination}</h2>
            {/* <p>{vacation.vacationId}</p> */}
            <p>
              <span>From: {formattedStartDate}</span>
            </p>
            <p>
              <span>To: {formattedEndDate}</span>
            </p>
            <p>{vacation.description}</p>
            <p>price: {vacation.price}</p>
          </div>
        </>
      );
    } else {
      return <div>Vacation not found.</div>;
    }
  };

  return (
    <div className={styles.VacationDetails}>
      <div>{renderVacation()}</div>

      {user && user.role === 'admin' && (
        <VacationButtons vacationId={+vacationId!} vacation={vacation!} />
      )}
      {user && user.role === 'user' && (
        <LikeButton userId={user.userId} vacation={vacation!} />
      )}
    </div>
  );
};

export default VacationDetails;
