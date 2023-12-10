import Link from 'next/link';
import React from 'react';
import { FiBox, FiMenu } from 'react-icons/fi';
import { NavLink } from 'src/types/navbar';
import { ThemeController, WalletConnectButton } from '../molecules';

interface Props {
  navLinks: NavLink[];
}

const NavBar: React.FC<Props> = ({ navLinks }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl hidden lg:flex">
          <FiBox />
          Fundraiser
        </Link>
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <FiMenu />
          </button>
          <ul className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-52">
            {navLinks.map(({ label, pathname }, index) => (
              <li key={index}>
                <Link href={pathname}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl lg:hidden">
          Fundraiser
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map(({ label, pathname }, index) => (
            <li key={index} className="ml-3">
              <Link href={pathname}>{label}</Link>
            </li>
          ))}
          <li>
            <ThemeController />
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default NavBar;
