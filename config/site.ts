import {
  IoArchiveOutline,
  IoHomeOutline,
  IoPricetagOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Notes',
  description: 'Take notes',
  navItems: [
    {
      label: 'All Notes',
      href: '/all',
      icon: IoHomeOutline,
    },
    {
      label: 'Archived Notes',
      href: '/archive',
      icon: IoArchiveOutline,
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/all',
      icon: IoHomeOutline,
    },
    {
      label: 'Search',
      href: '/search',
      icon: IoSearchOutline,
    },
    {
      label: 'Archive',
      href: '/archive',
      icon: IoArchiveOutline,
    },
    {
      label: 'Tags',
      href: '/tags',
      icon: IoPricetagOutline,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: IoSettingsOutline,
    },
  ],
  links: {},
};
