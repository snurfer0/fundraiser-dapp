import React from 'react';
import { RadioVariant } from 'src/enums/radio.variant.enum';

interface Props {
  name: string;
  label?: string;
  checked?: boolean;
  variant?: RadioVariant;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<Props> = ({
  name,
  label,
  checked,
  onChange,
  disabled,
  variant = RadioVariant.success,
}) => {
  const className = `radio ${variant}`;
  const radioId = `radio-${name}`;

  return (
    <label
      htmlFor={radioId}
      className="flex items-center cursor-pointer select-none"
    >
      <input
        type="radio"
        id={radioId}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className={className}
      />
      {label && <span className="ml-2">{label}</span>}
    </label>
  );
};

export default Radio;
