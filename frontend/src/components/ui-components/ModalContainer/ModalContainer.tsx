import React, { FC, useState } from 'react';
import styles from './ModalContainer.module.scss';
import Modal from '../Modal/Modal';

interface ModalContainerProps {
  children: React.ReactNode;
}

const ModalContainer: FC<ModalContainerProps> = ({ children }) => {
  //control the modal show state
  const [modalIsOpen, setModalIsOpen] = useState(true); // Modal opens on load

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className={styles.ModalContainer}>
      {modalIsOpen && <Modal onClose={toggleModal}>{children}</Modal>}
    </div>
  );
};

export default ModalContainer;
