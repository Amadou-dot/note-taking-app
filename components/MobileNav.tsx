'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { siteConfig } from '@/config/site';
export default function MobileNav() {
  const pathName = usePathname();

  return (
    <div className='fixed bottom-4 h-16 flex max-w-full w-full items-center justify-evenly border-t border-gray-300 p-4 dark:border-gray-700 text-2xl *:flex *:h-12 *:w-24 *:cursor-pointer *:items-center *:justify-center lg:hidden'>
      {siteConfig.navMenuItems.map((item) => (
        <Link
          key={item.label}
          className={
            pathName === item.href ? 'rounded-md bg-blue-300 text-blue-700' : ''
          }
          href={item.href}
        >
          {React.createElement(item.icon, {})}
        </Link>
      ))}
    </div>
  );
}
