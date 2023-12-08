import React from 'react';
import { ToggleVariant } from 'src/enums/toggle.variant.enum';

interface Props {
  checked?: boolean;
  name?: string;
  variant?: ToggleVariant;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: React.FC<Props> = ({
  checked,
  name,
  variant = ToggleVariant.success,
  onChange,
}) => {
  const className = `toggle ${variant}`;
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className={className}
    />
  );
};

export default Toggle;
