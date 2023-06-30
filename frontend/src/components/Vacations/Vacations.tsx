import React, { FC, useEffect, useState } from 'react';
import styles from './Vacations.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getVacations } from '../../fetch';
import { setVacations } from './vacationsSlice';
import { format } from 'date-fns';
import Vacation from '../../models/Vacation';
import VacationItem from './VacationItem/VacationItem';
import Button from '../ui-components/Button/Button';
import AddVacation from './AddVacation/AddVacation';
import { NavLink } from 'react-router-dom';

interface VacationsProps {}

const Vacations: FC<VacationsProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);

  useEffect(() => {
    try {
      getVacations().then((vacations) => {
        dispatch(setVacations(vacations));
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleItemClick = (vacation: Vacation) => {};

  const renderVacations = () => {
    return vacations.map((vacation) => {
      const {
        vacationId,
        destination,
        description,
        startDate,
        endDate,
        price,
      } = vacation;

      return <VacationItem key={vacationId} vacation={vacation} />;
    });
  };

  return (
    <>
      <div className={styles.Vacations}>{renderVacations()}</div>;
      <NavLink to="/vacations/add_vacation">
        <Button text={'Add new vacation'}></Button>
      </NavLink>
    </>
  );
};

export default Vacations;
