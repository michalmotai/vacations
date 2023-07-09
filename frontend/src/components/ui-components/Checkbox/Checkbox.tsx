import React, { FC } from 'react';

type CheckboxProps = {
  labelText: string;
  onChange: (filter: string) => void;
  value: string;
  isChecked: boolean;
};

const Checkbox: FC<CheckboxProps> = ({
  labelText,
  onChange,
  value,
  isChecked,
}) => {
  const handleChecked = () => {
    onChange(value);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      {labelText}
    </label>
  );
};

export default Checkbox;
