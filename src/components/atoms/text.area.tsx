import React from 'react';
import Label from './label';

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({
  name,
  label,
  placeholder,
  value,
  maxLength = 1000,
  error,
  disabled,
  onChange,
}) => {
  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChange && e.target.value.length <= maxLength) {
      onChange(e);
    }
  }

  return (
    <Label
      htmlFor={name}
      topLeft={label}
      bottomLeft={error}
      topRight={`${String(value).length}/${maxLength}`}
    >
      <textarea
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        placeholder={placeholder}
        className="textarea textarea-bordered h-30"
      />
    </Label>
  );
};

export default TextArea;
