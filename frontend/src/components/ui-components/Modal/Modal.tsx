import React, { FC } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  disableOverlayClick?: boolean;
}

const Modal: FC<ModalProps> = ({ children, onClose, disableOverlayClick }) => {
  const disableOverlayClickHandler = disableOverlayClick ? undefined : onClose;
  const portal = (
    <div className={styles.Modal}>
      <div
        onClick={disableOverlayClickHandler}
        className={styles.Modal__overlay}></div>

      <div className={styles.Modal__content}>
        <NavLink to={'/'}>
          <Button
            className={styles.Modal__closeButton}
            onClick={onClose}
            text="X"></Button>
        </NavLink>

        {children}
      </div>
    </div>
  );

  return createPortal(portal, document.body);
};

export default Modal;
