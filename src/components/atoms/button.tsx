'use client';
import React from 'react';
import { ButtonType } from 'src/enums/button.type.enum';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import Loading from './loading';

export interface ButtonProps {
  className?: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  onClick?: () => void;
}

interface Props extends ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  className = '',
  children,
  variant = ButtonVariant.Primary,
  loading,
  onClick,
  type = ButtonType.button,
}) => {
  const classNameFull = `btn ${variant} ${className}`;
  return (
    <button onClick={onClick} type={type} className={classNameFull}>
      {loading ? <Loading fullScreen={false} /> : children}
    </button>
  );
};

export default Button;
