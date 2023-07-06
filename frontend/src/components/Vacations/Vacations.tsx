import React, { FC, useEffect, useState } from 'react';
import styles from './Vacations.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getVacations } from '../../fetch';
import { onGetLikesPerVacation, setVacations } from './vacationsSlice';
import Vacation from '../../models/Vacation';
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

interface VacationsProps {}

const Vacations: FC<VacationsProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);
  const { user, likedVacations } = useAppSelector((state) => state.authState);
  const [isChecked, setIsChecked] = useState();

  const checkIfChecked = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, []);

  const renderVacations = () => {
    return vacations.map((vacation) => {
      const {
        vacationId,
        destination,
        description,
        startDate,
        endDate,
        price,
        likesCount,
      } = vacation;

      return (
        <VacationItem
          key={vacationId}
          vacation={vacation}
          likedVacations={likedVacations}
        />
      );
    });
  };

  return (
    <>
      <div className={styles.Vacations}>{renderVacations()}</div>;
      <Checkbox
        labelText={'filter liked vacations'}
        checked={false}
        onChange={function (): void {}}></Checkbox>
      {/* <label htmlFor="filterLikedVacations">My liked vacations</label>
      <input type="checkbox" name="filterLikedVacations" id="filter1" />
      <label htmlFor="filterActiveVacations">Active vacations</label>
      <input type="checkbox" name="filterActiveVacations" id="filter2" />
      <label htmlFor="filetFutureVacations">filet Future Vacations</label>
      <input type="checkbox" name="filetFutureVacations" id="filter3" /> */}
      <NavLink to="/vacations/add_vacation">
        <Button text={'Add new vacation'}></Button>
      </NavLink>
    </>
  );
};

export default Vacations;
