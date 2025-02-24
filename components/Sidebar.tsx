'use client';
import clsx from 'clsx';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Logo } from './Logo';

import { siteConfig } from '@/config/site';

type SidebarProps = {
  className?: string;
};
export default function Sidebar({ className }: SidebarProps) {
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
        const isActive = pathName === item.href;

        return (
          <Link
            key={item.label}
            className={clsx(
              'flex w-full items-center p-2 text-lg justify-between',
              isActive
                ? 'rounded-md bg-gray-100 font-semibold dark:bg-gray-900'
                : 'font-light',
            )}
            href={item.href}
          >
            <span className='flex items-center gap-2'>
              {React.createElement(item.icon)}
              <span>{item.label}</span>
            </span>
            {isActive && <MdOutlineKeyboardArrowRight size={22}/>}
          </Link>
        );
      })}
    </div>
  );
}
