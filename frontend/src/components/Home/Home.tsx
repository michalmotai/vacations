import React, { FC } from 'react';
import styles from './Home.module.scss';
import Vacations from '../Vacations/Vacations';
import backgroundImg from '../../assets/images/Default_blue_and_turquoise_sky_with_s_galactic_path_and_dust_0.jpg';
import Register from '../AuthArea/Register/Register';
import { useAppSelector } from '../../hooks';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.authState);

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
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp; and beyond!
        </h1>
      </div>
      {user ? <Vacations /> : <Register />}
    </div>
  );
};

export default Home;
