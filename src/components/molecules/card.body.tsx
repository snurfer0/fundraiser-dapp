import React from 'react';

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const CardBody: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className="card-body">
      {title && <h2 className="card-title break-words">{title}</h2>}
      {description && (
        <div className="h-10 mb-1 overflow-hidden text-ellipsis whitespace-normal break-words text-sm">
          {description}
        </div>
      )}
      {children}
    </div>
  );
};

export default CardBody;
