import React from 'react';
import { InputType } from 'src/enums/input.type.enum';
import Label from './label';

interface Props {
  label?: string;
  type?: InputType;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  name?: string;
  error?: string;
  info?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  label,
  type,
  placeholder,
  disabled,
  value,
  name,
  error,
  info,
  onChange,
}) => {
  return (
    <Label htmlFor={name} topLeft={label} error={error} info={info}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </Label>
  );
};

export default Input;
