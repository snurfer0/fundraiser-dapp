import React from 'react';
import { InputType } from 'src/enums/input.type.enum';
import Label from './label';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  name,
  error,
  disabled,
  onChange,
}) => {
  return (
    <Label topLeft={label} error={error}>
      <input
        type={InputType.file}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="file-input file-input-bordered w-full"
      />
    </Label>
  );
};

export default FileInput;
