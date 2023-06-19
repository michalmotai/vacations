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
      {children}
      {error && (
        <span className={styles.FormInputGroupWithError__error}>{error}</span>
      )}
    </div>
  );
};
export default FormInputGroupWithError;
