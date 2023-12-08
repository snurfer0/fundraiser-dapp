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
    label: 'About',
    pathname: '/about',
  },
];

export const defaultPagination = {
  limit: 3,
};
