import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Favourites',
    iconName: 'heart-filled',
    route: 'account/favourites',
  },
  {
    displayName: 'Plans',
    iconName: 'calendar-event',
    route: 'account/plans',
  },
  {
    displayName: 'Shopping List',
    iconName: 'garden-cart',
    // route: 'account/shoppinglist',
  },
  {
    navCap: 'Personal',
  },
  {
    displayName: 'account Info',
    iconName: 'user-square-rounded',
    // route: '',
  },
  {
    displayName: 'My Recipes',
    iconName: 'clipboard-list',
    route: 'account/my-recipes',
  },
  {
    displayName: 'Summary Of Activities',
    iconName: 'activity',
    // route: '',
  }
];
