import React, { FC, ReactNode } from 'react';
import styles from './FormInputGroupWithError.module.scss';

interface FormInputGroupWithErrorProps {
  children: ReactNode;
  error?: string;
}

const FormInputGroupWithError: FC<FormInputGroupWithErrorProps> = ({
  error,
  children,
}) => {
  return (
    <div className={styles.FormInputGroupWithError}>
      <div className={styles.FormInputGroupWithError__inputContainer}>
        {children}
      </div>
      {error && (
        <div className={styles.FormInputGroupWithError__error}>{error}</div>
      )}
    </div>
  );
};

export default FormInputGroupWithError;
