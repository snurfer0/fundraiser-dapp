import React from 'react';

interface Props {
  value: number;
  max: number;
}

const ProgressBar: React.FC<Props> = ({ value, max }) => {
  return (
    <div className="w-full">
      <progress className="w-full progress" value={value} max={max} />
      <div className="flex justify-between text-xs">
        <span>{value} ETH</span>
        <span>{max} ETH</span>
      </div>
    </div>
  );
};

export default ProgressBar;
