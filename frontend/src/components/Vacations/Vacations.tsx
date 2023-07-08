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
import FilterVacations from './FilterVacations/FilterVacations';
import Vacation from '../../models/Vacation';

interface VacationsProps {}

const Vacations: FC<VacationsProps> = () => {
  const dispatch = useAppDispatch();
  const { vacations } = useAppSelector((state) => state.vacationsState);
  const { user, likedVacations } = useAppSelector((state) => state.authState);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setselectedFilter] = useState('all');
  const [filteredVacations, setfilteredVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get vacations from the server
        const fetchedVacations = await getVacations();
        dispatch(setVacations(fetchedVacations));

        // Initialize the likesCount to zero
        const vacationsWithLikesCount = fetchedVacations.map((vacation) => ({
          ...vacation,
          likesCount: 0,
        }));
        dispatch(setVacations(vacationsWithLikesCount));

        // Get likes for each vacation
        const likesPerVacation = await getLikesPerVacation();
        console.log('likesPerVacation', likesPerVacation);

        // Update likes for each vacation
        likesPerVacation.forEach(({ vacationId, likesCount }) => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
      <FilterVacations setselectedFilter={setselectedFilter} />
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
