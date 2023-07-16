// ModalContainer.tsx
import React, { FC, useState } from 'react';
import styles from './ModalContainer.module.scss';
import Modal from '../Modal/Modal';

interface ModalContainerProps {
  children: React.ReactNode;
  disableOverlayClick?: boolean;
}

const ModalContainer: FC<ModalContainerProps> = ({
  children,
  disableOverlayClick,
}) => {
  //control the modal show state
  const [modalIsOpen, setModalIsOpen] = useState(true); // Modal opens on load

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className={styles.ModalContainer__content}>
      {modalIsOpen && (
        <Modal onClose={toggleModal} disableOverlayClick={disableOverlayClick}>
          {children}
        </Modal>
      )}
    </div>
  );
};

export default ModalContainer;
