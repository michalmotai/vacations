import React, { FC, MouseEvent, MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: FC<ButtonProps> = ({ text, icon, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${styles.Button} ${className}`}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
