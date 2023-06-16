import React, { FC } from 'react';
import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();

  return <div className={styles.Home}></div>;
};

export default Home;
