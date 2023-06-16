import React, { FC } from 'react';
import styles from './Vacations.module.scss';

interface VacationsProps {}

const Vacations: FC<VacationsProps> = () => (
  <div className={styles.Vacations}>
    Vacations Component
  </div>
);

export default Vacations;
