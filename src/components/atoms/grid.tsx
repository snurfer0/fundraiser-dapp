import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode[];
};

const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid pb-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

export default Grid;
