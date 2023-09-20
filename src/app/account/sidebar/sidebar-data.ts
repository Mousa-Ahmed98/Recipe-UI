import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Favourites',
    iconName: 'heart-filled',
    route: 'profile/favourites',
  },
  {
    displayName: 'Plans',
    iconName: 'calendar-event',
    route: 'profile/plans',
  },
  {
    displayName: 'Shopping List',
    iconName: 'garden-cart',
    route: '/profile/shoppinglist',
  },
  {
    navCap: 'Personal',
  },
  {
    displayName: 'Profile Info',
    iconName: 'user-square-rounded',
    route: '',
  },
  {
    displayName: 'My Recipes',
    iconName: 'clipboard-list',
    route: '',
  },
  {
    displayName: 'Summary Of Activities',
    iconName: 'activity',
    route: '',
  }
];
