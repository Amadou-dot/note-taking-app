'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { siteConfig } from '@/config/site';
export default function MobileNav() {
  const pathName = usePathname();

  return (
    <div className='fixed bottom-0 flex h-16 w-full max-w-full items-center justify-evenly border-t border-gray-300 bg-white px-2 text-2xl *:flex *:h-12 *:w-24 *:cursor-pointer *:items-center *:justify-center dark:border-gray-700 dark:bg-black lg:hidden'>
      {siteConfig.navMenuItems.map((item) => (
        <Link
          key={item.label}
          className={
            pathName.includes(item.href)  ? 'rounded-md bg-blue-300 text-blue-700' : ''
          }
          href={item.href}
        >
          {React.createElement(item.icon)}
        </Link>
      ))}
    </div>
  );
}
