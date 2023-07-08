import React, { FC } from 'react';
import styles from './FilterVacations.module.scss';
import { getVacationLikedByUserIdAsync } from '../../../fetch/likes';
import { useAppSelector } from '../../../hooks';
import Vacation from '../../../models/Vacation';

interface FilterVacationsProps {
  setselectedFilter: (filter: string) => void;
}

const FilterVacations: FC<FilterVacationsProps> = ({ setselectedFilter }) => {
  const { user } = useAppSelector((state) => state.authState);

  const handleFilterSelection = async (filter: string) => {
    try {
      setselectedFilter(filter);
    } catch (error) {
      console.log('Error applying filter:', error);
    }
  };

  return (
    <div className={styles.FilterVacations}>
      <button onClick={() => handleFilterSelection('startDate')}>
        Filter by Start Date
      </button>
      <button onClick={() => handleFilterSelection('active')}>
        Filter by Active
      </button>
      {user?.userId && (
        <button onClick={() => handleFilterSelection('likes')}>
          Filter by Likes
        </button>
      )}
    </div>
  );
};

export default FilterVacations;
