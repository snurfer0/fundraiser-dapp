import Link from 'next/link';
import React from 'react';
import { GitHub } from 'react-feather';
import PackageJson from '../../../package.json';

const GithubButton = () => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={PackageJson.repository}
      className="fixed bottom-10 right-10 w-8 h-8"
    >
      <GitHub />
    </Link>
  );
};

export default GithubButton;
