import React, { FC } from 'react';
import styles from './Home.module.scss';
import Vacations from '../Vacations/Vacations';
import backgroundImg from '../../assets/images/background.jpg';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.Home__imagecontainer}>
        <img
          src={backgroundImg}
          alt="Background"
          className={styles.Home__image}
        />
        <h1 className={styles.Home__title}>
          To infinity...
          <br /> and beyond!
        </h1>
      </div>
      <Vacations />
    </div>
  );
};

export default Home;
