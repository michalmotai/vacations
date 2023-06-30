import React, { FC, ReactNode } from 'react';
import styles from './Alert.module.scss';
import Modal from '../Modal/Modal';

interface AlertProps {
  error: string | Error;
  children?: ReactNode;
  onClose: () => void;
}

const Alert: FC<AlertProps> = ({ onClose, error }) => {
  let _error = typeof error === 'string' ? error : error.message;
  return (
    <Modal onClose={onClose}>
      <div className={styles.Alert}>
        <p>Something went wrong</p>
        <br />
        <p>(_error)</p>
      </div>
    </Modal>
  );
};

export default Alert;
