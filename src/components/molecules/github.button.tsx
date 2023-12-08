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
      style={{ position: 'fixed', bottom: '40px', right: '40px' }}
    >
      <GitHub />
    </Link>
  );
};

export default GithubButton;
