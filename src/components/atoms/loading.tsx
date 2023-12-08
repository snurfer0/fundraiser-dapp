import * as React from 'react';
import { LoadingSize } from 'src/enums/loading.size.enum';

interface Props {
  fullScreen?: boolean;
  size?: LoadingSize;
}

const Loading: React.FC<Props> = ({
  size = LoadingSize.lg,
  fullScreen = true,
}) => {
  const className = `loading loading-ring ${size} ${
    fullScreen ? 'h-screen' : ''
  }`;
  return (
    <div className="flex justify-center items-center w-full ">
      <span className={className} />
    </div>
  );
};

export default Loading;
