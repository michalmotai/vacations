import React, { FC } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  labelText: string;
  onChange: (filter: string) => void;
  value: string;
  isChecked: boolean;
}

const Switch: FC<SwitchProps> = ({ labelText, onChange, value, isChecked }) => {
  const handleChecked = () => {
    onChange(value);
  };

  return (
    <label className={styles.Switch}>
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      <div className={styles.Switch__container}>
        <span className={styles.Switch__slider}></span>
        <span className={styles.Switch__label}>{labelText}</span>
      </div>
    </label>
    
  );
};

export default Switch;
