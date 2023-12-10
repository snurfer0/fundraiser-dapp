import Link from 'next/link';
import React from 'react';
import { Button } from 'src/components/atoms';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The requested resource could not be found.
        </p>
        <Link className="text-blue-500 underline" href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
