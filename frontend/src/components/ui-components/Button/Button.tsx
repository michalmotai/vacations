import React, { FC, MouseEvent } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ text, icon }) => {
  return (
    <button>
      {icon}
      {text}
    </button>
  );
};

export default Button;
