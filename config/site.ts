import {
  IoArchiveOutline,
  IoHomeOutline,
  IoPricetagOutline,
  IoSearchOutline,
  IoSettingsOutline,
  IoTimeOutline,
} from 'react-icons/io5';
export type SiteConfig = typeof siteConfig;

/**
 * Configuration object for the site.
 */
export const siteConfig = {
  /**
   * The name of the site.
   */
  name: 'Notes',

  /**
   * A brief description of the site.
   */
  description: 'Take notes',

  /**
   * Icons used throughout the site.
   */
  icons: {
    /**
     * Icon for the home page.
     */
    home: IoHomeOutline,

    /**
     * Icon for the archive page.
     */
    archive: IoArchiveOutline,

    /**
     * Icon for the search functionality.
     */
    search: IoSearchOutline,

    /**
     * Icon for the tags functionality.
     */
    tag: IoPricetagOutline,

    /**
     * Icon for the settings page.
     */
    settings: IoSettingsOutline,

    /**
     * Icon for the time-related functionality.
     */
    time: IoTimeOutline,
  },

  /**
   * Titles for different paths in the site.
   */
  pathTitles: {
    /**
     * Title for the "all notes" path.
     */
    all: 'All Notes',

    /**
     * Title for the "archived notes" path.
     */
    archive: 'Archived Notes',

    /**
     * Title for the "tags" path.
     */
    tags: 'Tags',

    /**
     * Title for the "search" path.
     */
    search: 'Search',

    /**
     * Title for the "settings" path.
     */
    settings: 'Settings',

    /**
     * Title for the "create note" path.
     */
    create: 'Create Note',
  },

  /**
   * Navigation items for the main navigation.
   */
  navItems: [
    {
      /**
       * Label for the navigation item.
       */
      label: 'All Notes',

      /**
       * URL for the navigation item.
       */
      href: '/all',

      /**
       * Icon for the navigation item.
       */
      icon: IoHomeOutline,
    },
    {
      /**
       * Label for the navigation item.
       */
      label: 'Archived Notes',

      /**
       * URL for the navigation item.
       */
      href: '/archive',

      /**
       * Icon for the navigation item.
       */
      icon: IoArchiveOutline,
    },
  ],

  /**
   * Navigation items for the menu.
   */
  navMenuItems: [
    {
      /**
       * Label for the menu item.
       */
      label: 'Home',

      /**
       * URL for the menu item.
       */
      href: '/all',

      /**
       * Icon for the menu item.
       */
      icon: IoHomeOutline,
    },
    {
      /**
       * Label for the menu item.
       */
      label: 'Search',

      /**
       * URL for the menu item.
       */
      href: '/search',

      /**
       * Icon for the menu item.
       */
      icon: IoSearchOutline,
    },
    {
      /**
       * Label for the menu item.
       */
      label: 'Archive',

      /**
       * URL for the menu item.
       */
      href: '/archive',

      /**
       * Icon for the menu item.
       */
      icon: IoArchiveOutline,
    },
    {
      /**
       * Label for the menu item.
       */
      label: 'Tags',

      /**
       * URL for the menu item.
       */
      href: '/tags',

      /**
       * Icon for the menu item.
       */
      icon: IoPricetagOutline,
    },
    {
      /**
       * Label for the menu item.
       */
      label: 'Settings',

      /**
       * URL for the menu item.
       */
      href: '/settings',

      /**
       * Icon for the menu item.
       */
      icon: IoSettingsOutline,
    },
  ],

  /**
   * Additional links for the site.
   */
  links: {},
};
