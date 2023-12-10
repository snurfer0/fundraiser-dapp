import React from 'react';

interface Props {
  topLeft?: string;
  topRight?: string;
  error?: string;
  info?: string;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}

const Label: React.FC<Props> = ({
  topLeft,
  topRight,
  error,
  info,
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
        {error ? (
          <span className="label-text-alt text-error">{error}</span>
        ) : (
          <span className="label-text-alt text-info">{info}</span>
        )}
      </div>
    </label>
  );
};

export default Label;
