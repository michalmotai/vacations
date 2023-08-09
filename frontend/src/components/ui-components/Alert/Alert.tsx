import React, { FC, ReactNode } from 'react';
import styles from './Alert.module.scss';
import Modal from '../Modal/Modal';
import ModalContainer from '../ModalContainer/ModalContainer';

interface AlertProps {
  error: Error | AxiosError | null;
  children?: ReactNode;
  onClose: () => void;
}

interface AxiosError extends Error {
  response?: {
    data?: any;
    status?: number;
  };
}

const Alert: FC<AlertProps> = ({ onClose, error }) => {
  if (!error) {
    return null; // If there's no error, return null to not render the alert
  }

  // Extract relevant error information
  let errorMessage = 'Something went wrong';
  if ('response' in error && error.response) {
    errorMessage =
      error.response.data ||
      `Request failed with status code ${error.response.status}`;
  }
  console.log(error);

  return (
    <ModalContainer disableOverlayClick={true}>
      <div className={styles.Alert}>
        <p>{errorMessage}</p>
      </div>
    </ModalContainer>
  );
};

export default Alert;
