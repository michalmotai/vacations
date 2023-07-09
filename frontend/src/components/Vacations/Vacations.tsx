import React, { FC, useEffect, useState } from 'react';
import styles from './Vacations.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  filterVacationByStartDateAsync,
  filterVacationsByActiveAsync,
  getVacations,
} from '../../fetch';
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
import Vacation from '../../models/Vacation';

interface VacationsProps {}

const Vacations: FC<VacationsProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);
  const { user, likedVacations } = useAppSelector((state) => state.authState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setselectedFilter] = useState('all');
  const [filteredVacations, setfilteredVacations] = useState<Vacation[]>([]);
  const [filters, setFilters] = useState([
    {
      labelText: 'Filter by Start Date',
      value: 'startDate',
    },
    {
      labelText: 'Filter active vacations',
      value: 'active',
    },
    {
      labelText: 'Filter liked',
      value: 'likes',
    },
  ]);

  const handleFilterSelect = (filter: string) => {
    if (selectedFilter === filter) {
      setselectedFilter('all');
    } else {
      setselectedFilter(filter);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const fetchedVacations = await getVacations();
        dispatch(setVacations(fetchedVacations));

        const vacationsWithLikesCount = fetchedVacations.map((vacation) => ({
          ...vacation,
          likesCount: 0,
        }));
        dispatch(setVacations(vacationsWithLikesCount));

        const likesPerVacation = await getLikesPerVacation();

        likesPerVacation.forEach(({ vacationId, likesCount }) => {
          dispatch(onGetLikesPerVacation({ vacationId, likesCount }));
        });

        if (user) {
          const likedVacations = await getVacationLikedByUserIdAsync(
            user.userId
          );
          dispatch(setLikedVacations(likedVacations));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilter = async () => {
      try {
        let filteredResults: Vacation[] = [];

        switch (selectedFilter) {
          case 'startDate':
            filteredResults = await filterVacationByStartDateAsync();
            break;
          case 'active':
            filteredResults = await filterVacationsByActiveAsync();
            break;
          case 'likes':
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

    applyFilter();
  }, [selectedFilter, vacations, user?.userId]);

  const renderVacations = () => {
    const renderedVacations =
      filteredVacations.length > 0 ? filteredVacations : vacations;

    return renderedVacations.map((vacation) => (
      <VacationItem
        key={vacation.vacationId}
        vacation={vacation}
        user={user as User}
      />
    ));
  };

  const renderAddButton = () => {
    return (
      <NavLink to="/vacations/add_vacation">
        <Button text={'Add new vacation'} />
      </NavLink>
    );
  };

  const renderFilters = filters.map((filter) => (
    <Checkbox
      key={filter.value}
      labelText={filter.labelText}
      onChange={handleFilterSelect}
      value={filter.value}
      isChecked={selectedFilter === filter.value}
    />
  ));

  return (
    <>
      <div>{renderFilters}</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.Vacations}>{renderVacations()}</div>
      )}
      {user?.role === 'admin' && renderAddButton()}
    </>
  );
};

export default Vacations;
