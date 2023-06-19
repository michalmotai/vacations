import React, { FC, useEffect } from 'react';
import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Vacations from '../Vacations/Vacations';
import { getVacations } from '../../fetch';
import { setVacations } from '../Vacations/vacationsSlice';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  
  return (
    <div className={styles.Home}>
      <Vacations />
    </div>
  );
};

export default Home;
