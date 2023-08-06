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
import User from '../../models/User';
import Vacation from '../../models/Vacation';
import Pagination from '../ui-components/Pagination/Pagination';
import Login from '../AuthArea/Login/Login';
import Switch from '../ui-components/Switch/Switch';
import Checkbox from '../ui-components/Checkbox/Checkbox';

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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [vacationsPerPage, setvacationsPerPage] = useState(10); //number of pages to show on page

  // Fetch vacations data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        let fetchedVacations = await getVacations();
        const likesPerVacation = await getLikesPerVacation();

        //add the likesCount to the vacation object
        fetchedVacations = fetchedVacations.map((vacation) => {
          const likeInfo = likesPerVacation.find(
            (like) => like.vacationId === vacation.vacationId
          );
          return {
            ...vacation,
            likesCount: likeInfo ? likeInfo.likesCount : 0,
          };
        });

        dispatch(setVacations(fetchedVacations));

        if (user) {
          const likedVacations = await getVacationLikedByUserIdAsync(
            user.userId
          );
          dispatch(setLikedVacations(likedVacations));
        }

        // Apply initial filter
        applyFilter(fetchedVacations);
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Query the server based on selected filter
  useEffect(() => {
    applyFilter(vacations);
  }, [selectedFilter, vacations]);

  // Apply filter to vacations
  const applyFilter = async (vacationsToFilter: Vacation[]) => {
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
            filteredResults = await getVacationLikedByUserIdAsync(user.userId);
          }
          break;
        default:
          filteredResults = vacationsToFilter;
          break;
      }

      setfilteredVacations(filteredResults);
      setCurrentPage(1);
    } catch (error) {
      console.log('Error applying filter:', error);
    }
  };

  // Handle filter selection
  const handleFilterSelect = (filter: string) => {
    if (selectedFilter === filter) {
      setselectedFilter('all');
    } else {
      setselectedFilter(filter);
    }
  };

  // Render vacations based on selected filter and pagination
  const renderVacationsPerPage = () => {
    const renderedVacations =
      filteredVacations.length > 0 ? filteredVacations : vacations;

    if (renderedVacations.length === 0) {
      return <div>No vacations found.</div>;
    }

    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = renderedVacations.slice(
      indexOfFirstVacation,
      indexOfLastVacation
    );

    return currentVacations.map((vacation) => (
      <VacationItem
        key={vacation.vacationId}
        vacation={vacation}
        user={user as User}
      />
    ));
  };

  // Render add button
  const renderAddButton = () => {
    return (
      <NavLink to="/vacations/add_vacation">
        <Button text={'Add new'} className={styles.Vacations__addButton} />
      </NavLink>
    );
  };

  // Render filters checkboxes
  const renderFilters = filters.map((filter) => (
    <Switch
      key={filter.value}
      labelText={filter.labelText}
      onChange={handleFilterSelect}
      value={filter.value}
      isChecked={selectedFilter === filter.value}
    />
  ));

  return (
    <>
      {!user ? (
        <>
          <Login />
          <h2>you must be registered user to view our vacations</h2>
          <NavLink to={'/register'}>Register here</NavLink>
        </>
      ) : (
        <>
          <div className={styles.Vacations__filtersContainer}>
            {renderFilters}
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className={styles.Vacations}>{renderVacationsPerPage()}</div>
          )}
          {user?.role === 'admin' && renderAddButton()}
          <Pagination
            totalVacations={filteredVacations.length || vacations.length}
            vacationsPerPage={vacationsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
};
export default Vacations;
