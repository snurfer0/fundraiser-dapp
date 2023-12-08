import React from 'react';

interface Props {
  topLeft?: string | number;
  topRight?: string | number;
  bottomLeft?: string | number;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}

const Label: React.FC<Props> = ({
  topLeft,
  topRight,
  bottomLeft,
  htmlFor,
  className = '',
  children,
}) => {
  return (
    <label className={`form-control w-full ${className}`} htmlFor={htmlFor}>
      <div className="label">
        <span className="label-text">{topLeft}</span>
        <span className="label-text-alt">{topRight}</span>
      </div>
      {children}
      <div className="label">
        <span className="label-text-alt text-error">{bottomLeft}</span>
      </div>
    </label>
  );
};

export default Label;
