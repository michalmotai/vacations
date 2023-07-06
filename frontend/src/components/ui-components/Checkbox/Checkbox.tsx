type CheckboxProps = {
  labelText: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ labelText, checked, onChange }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {labelText}
    </label>
  );
};

export default Checkbox;
