import React, { FC } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const portal = (
    <div className={styles.Modal}>
      <div onClick={onClose} className={styles.Modal__overlay}></div>
      <div className={styles.Modal__content}>{children}</div>
    </div>
  );

  return createPortal(portal, document.body);
};

export default Modal;