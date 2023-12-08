import PackageJson from '../package.json';
import { NavLink } from './types/navbar';

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Home',
    pathname: '/',
  },
  {
    label: 'Fundraisers',
    pathname: '/fundraisers',
  },
  {
    label: 'Start a Fundraiser',
    pathname: '/start',
  },
  {
    label: 'Github',
    pathname: PackageJson.repository,
  },
];

export const defaultPagination = {
  limit: 3,
};
