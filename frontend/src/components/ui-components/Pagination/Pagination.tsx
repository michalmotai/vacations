import React, { FC } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalVacations: number;
  vacationsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  totalVacations,
  vacationsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalVacations / vacationsPerPage); i++) {
    pages.push(i);
    console.log('page:', pages);
  }
  return (
    <div className={styles.Pagination}>
      {pages.map((page, index) => {
        console.log('page:', page, 'currentPage:', currentPage);
        return (
          <button
            key={index}
            type="button"
            className={page === currentPage ? 'active' : ''}
            onClick={() => {
              setCurrentPage(page);
            }}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
