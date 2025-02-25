import {
  IoArchiveOutline,
  IoHomeOutline,
  IoPricetagOutline,
  IoSearchOutline,
  IoSettingsOutline,
  IoTimeOutline,
} from 'react-icons/io5';
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Notes',
  description: 'Take notes',
  icons: {
    home: IoHomeOutline,
    archive: IoArchiveOutline,
    search: IoSearchOutline,
    tag: IoPricetagOutline,
    settings: IoSettingsOutline,
    time: IoTimeOutline,
  },
  pathTitles: {
    'all': 'All Notes',
    'archive': 'Archived Notes',
    'tags': 'Notes Tagged: ',
    'search': 'Showing results for: ',
    'settings': 'Settings',
  },
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
