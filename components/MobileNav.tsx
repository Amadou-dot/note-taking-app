'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Logo } from './Logo';
import PageTitle from './PageTitle';

import { siteConfig } from '@/config/site';

/**
 * MobileNav component renders a responsive navigation bar for mobile devices.
 * It displays a menu toggle button, a page title, and a logo.
 * The menu items are dynamically generated from the siteConfig.navMenuItems array.
 *
 * @returns {JSX.Element} The rendered MobileNav component.
 *
 * @component
 * @example
 * // Example usage:
 * <MobileNav />
 *
 * @remarks
 * - The component uses the `usePathname` hook to get the current URL path.
 * - If the URL contains 'tags', it extracts the tag from the URL.
 * - The `isMenuOpen` state controls the visibility of the menu.
 * - The `NavbarMenuToggle` button toggles the `isMenuOpen` state.
 * - The `PageTitle` component displays a title based on the extracted tag.
 * - The `NavbarMenu` contains links generated from `siteConfig.navMenuItems`.
 *
 * @hook
 * - `usePathname` - Retrieves the current URL path.
 * - `useState` - Manages the `isMenuOpen` state.
 *
 * @param {boolean} isMenuOpen - State to track if the menu is open or closed.
 * @param {function} setIsMenuOpen - Function to update the `isMenuOpen` state.
 * @param {string | null} tag - Extracted tag from the URL if on the tags page.
 */
export default function MobileNav(): JSX.Element {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let tag: null | string = null;

  // if on the tags page, get the tag from the url (tags/[tag])
  if (pathName?.includes('tags')) {
    tag = pathName.split('/')[2];
  }

  return (
    <Navbar
      className='flex justify-between lg:hidden'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand>
          <PageTitle
            className='mb-4'
            replace={(tag && true) || false}
            tag={(tag && tag) || undefined}
            title={(tag && 'Notes Tagged: ') || undefined}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <NavbarBrand className='justify-end'>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navMenuItems.map((item) => (
          <NavbarMenuItem key={item.label} className='py-2'>
            <Link
              className={`flex w-full items-center gap-2 ${
                pathName?.includes(item.href) ? 'font-medium text-blue-700' : ''
              }`}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {React.createElement(item.icon)}
              <span>{item.label}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
