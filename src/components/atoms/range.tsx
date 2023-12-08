import * as React from 'react';
import Label from './label';

interface Props {
  min?: number;
  max?: number;
  value?: number;
  label?: string;
  name?: string;
  step?: number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Range: React.FC<Props> = ({
  min = 0,
  max = 100,
  value,
  label,
  name,
  step = 1,
  disabled,
  onChange,
}) => {
  return (
    <Label topLeft={label}>
      <input
        type="range"
        name={name}
        min={min}
        step={step}
        max={max}
        disabled={disabled}
        value={value}
        className="range"
        onChange={onChange}
      />
    </Label>
  );
};

export default Range;
