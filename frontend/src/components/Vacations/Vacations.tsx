import React, { FC, useEffect, useState } from 'react';
import styles from './Vacations.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getVacations } from '../../fetch';
import { onGetLikesPerVacation, setVacations } from './vacationsSlice';
import VacationItem from './VacationItem/VacationItem';
import Button from '../ui-components/Button/Button';
import { NavLink } from 'react-router-dom';
import {
  getLikesPerVacation,
  getVacationLikedByUserIdAsync,
} from '../../fetch/likes';
import { setLikedVacations } from '../../auth/authSlice';
import AdminArea from '../AdminArea/AdminArea';
import Checkbox from '../ui-components/Checkbox/Checkbox';
import User from '../../models/User';
import FilterVacations from './FilterVacations/FilterVacations';

interface VacationsProps {}

const Vacations: FC<VacationsProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);
  const { user, likedVacations } = useAppSelector((state) => state.authState);
  const [isChecked, setIsChecked] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get vacations from the server
        const fetchedVacations = await getVacations();
        dispatch(setVacations(fetchedVacations));

        //initialize the likesCount to zero
        dispatch(
          setVacations(
            fetchedVacations.map((vacation) => ({ ...vacation, likesCount: 0 }))
          )
        );

        // Get likes for each vacation
        const likesPerVacation = await getLikesPerVacation();
        console.log('likesPerVacation', likesPerVacation);

        //update likes for each vacation.likes
        likesPerVacation.map((likesData) => {
          const { vacationId, likesCount } = likesData;

          //update the redux vacationSlice
          dispatch(onGetLikesPerVacation({ vacationId, likesCount }));
          console.log('likes:', vacationId, likesCount);
        });

        // If the user is logged in, get their liked vacations
        if (user) {
          const likedVacations = await getVacationLikedByUserIdAsync(
            user.userId
          );
          dispatch(setLikedVacations(likedVacations));

          likedVacations.forEach((vacation) => {
            console.log(vacation);
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderVacations = () => {
    return vacations.map((vacation) => {
      const { vacationId } = vacation;

      return (
        <VacationItem
          key={vacationId}
          vacation={vacation}
          user={user as User}
        />
      );
    });
  };

  const renderaddButton = () => {
    return (
      <NavLink to="/vacations/add_vacation">
        <Button text={'Add new vacation'} />
      </NavLink>
    );
  };

  return (
    <>
      <FilterVacations />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.Vacations}>{renderVacations()}</div>
      )}
      <div>{user?.role === 'admin' && renderaddButton()}</div>
    </>
  );
};

export default Vacations;
