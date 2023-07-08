import React, { FC, MouseEvent, MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button onClick={onClick} className={styles.Button}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
