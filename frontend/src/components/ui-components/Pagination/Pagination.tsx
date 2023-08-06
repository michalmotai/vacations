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
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent default anchor behavior
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.Pagination}>
      {currentPage > 1 ? (
        <a href="#" onClick={handlePrevPage}>
          prev
        </a>
      ) : (
        ''
      )}

      {pages.map((page, index) => {
        return (
          <button
            key={index}
            type="button"
            className={
              page === currentPage ? `${styles.Pagination__active}` : ''
            }
            onClick={() => {
              setCurrentPage(page);
            }}>
            {page}
          </button>
        );
      })}
      {currentPage < pages.length ? (
        <a href="#" onClick={handleNextPage}>
          next
        </a>
      ) : null}
    </div>
  );
};

export default Pagination;
