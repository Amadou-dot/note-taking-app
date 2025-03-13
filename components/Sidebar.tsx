'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

import { Logo } from './Logo';
import TagsList from './TagsList';

import { siteConfig } from '@/config/site';

type SidebarProps = {
  className?: string;
};
/**
 * Sidebar component that displays a navigation menu with links and a logo.
 *
 * @param {SidebarProps} props - The props for the Sidebar component.
 * @param {string} props.className - Additional class names to apply to the sidebar.
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 *
 * The Sidebar component uses the `usePathname` hook to determine the current path and highlight the active navigation item.
 * It maps over the `siteConfig.navItems` array to generate the navigation links.
 * Each link displays an icon and a label, and the active link is styled differently.
 * The component also includes a `TagsList` component and a horizontal rule (`<hr />`) for additional content.
 */
export default function Sidebar({ className }: SidebarProps): JSX.Element {
  const pathName = usePathname();

  return (
    <div
      className={clsx(
        'mt-4 space-y-4 border-r border-gray-300 px-4 dark:border-gray-800',
        className,
      )}
    >
      <div>
        <Logo height={48} width={48} />
      </div>
      {siteConfig.navItems.map((item) => {
        const isActive = pathName?.includes(item.href);

        return (
          <Link
            key={item.label}
            className={clsx(
              'flex w-full items-center justify-between p-2 text-lg',
              isActive
                ? 'rounded-md bg-gray-100 text-blue-500 dark:bg-gray-900'
                : 't',
            )}
            href={item.href}
          >
            <span className='flex items-center gap-2'>
              {React.createElement(item.icon)}
              <span>{item.label}</span>
            </span>
            {isActive && <MdOutlineKeyboardArrowRight size={22} />}
          </Link>
        );
      })}
      <hr />
      {/* tags */}
      <TagsList />
    </div>
  );
}
