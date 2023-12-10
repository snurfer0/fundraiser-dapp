import Link from 'next/link';
import React from 'react';
import config from 'src/config';
import { linkedIn } from 'src/constants';
import PackageJson from '../../../package.json';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <nav>
        <header className="footer-title">Socials</header>
        <Link href={PackageJson.repository} className="link link-hover">
          Github
        </Link>
        <Link href={linkedIn} className="link link-hover">
          LinkedIn
        </Link>
      </nav>
      <div>
        <header className="footer-title">Legal & Sponsors</header>
        <p className="text-sm">© 2023 Procyon Soft</p>
        <p className="text-sm">Sponsored by: No one 😢</p>
      </div>
      <div>
        <header className="footer-title">Deployments</header>
        <Link
          target="_blank"
          href={`https://goerli.etherscan.io/address/${config.fundraiserFactoryAddress}`}
          className="text-sm"
        >
          Fundraiser factory (Goerli)
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
