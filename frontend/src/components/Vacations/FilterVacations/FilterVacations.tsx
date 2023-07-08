import React, { FC, useEffect, useState } from 'react';
import styles from './FilterVacations.module.scss';
import {
  filterVacationByStartDateAsync,
  filterVacationsByActiveAsync,
} from '../../../fetch';
import { getVacationLikedByUserIdAsync } from '../../../fetch/likes';
import { useAppSelector } from '../../../hooks';
import Vacation from '../../../models/Vacation';

interface FilterVacationsProps {}

const FilterVacations: FC<FilterVacationsProps> = ({}) => {
  const { vacations } = useAppSelector((state) => state.vacationsState);
  const { user, likedVacations } = useAppSelector((state) => state.authState);
  const [selectedFilter, setselectedFilter] = useState('all');

  const [filteredVacations, setfilteredVacations] =
    useState<Vacation[]>(vacations);

  useEffect(() => {
    const applyFilter = async (filter: string) => {
      try {
        let filteredResults: Vacation[] = [];

        switch (filter) {
          case 'startDate':
            console.log('filter start date');
            filteredResults = await filterVacationByStartDateAsync();
            break;
          case 'active':
            console.log('filter active');
            filteredResults = await filterVacationsByActiveAsync();
            break;
          case 'likes':
            console.log('filter likes');
            if (user?.userId) {
              filteredResults = await getVacationLikedByUserIdAsync(
                user.userId
              );
            }
            break;
          default:
            filteredResults = vacations;
            break;
        }

        setfilteredVacations(filteredResults);
      } catch (error) {
        console.log('Error applying filter:', error);
      }
    };

    if (selectedFilter) {
      applyFilter(selectedFilter);
    }
  }, [selectedFilter, vacations, user?.userId]);

  const handleFilterSelection = (filter: string) => {
    setselectedFilter(filter);
  };

  return (
    <div className={styles.FilterVacations}>
      <button onClick={() => handleFilterSelection('startDate')}>
        Filter by Start Date
      </button>
      <button onClick={() => handleFilterSelection('active')}>
        Filter by Active
      </button>
      <button onClick={() => handleFilterSelection('likes')}>
        Filter by Likes
      </button>
    </div>
  );
};

export default FilterVacations;
