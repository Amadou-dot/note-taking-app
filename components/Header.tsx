'use client';
import { Input } from '@heroui/input';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';

import { Logo } from './Logo';
import { ThemeSwitch } from './theme-switch';

import { siteConfig } from '@/config/site';

type HeaderProps = {
  className?: string;
};
export default function Header({ className }: HeaderProps) {
  const pathName = usePathname();
  const pathTitle: string =
    siteConfig.pathTitles[
      pathName.split('/')[1] as keyof typeof siteConfig.pathTitles
    ];

  return (
    <div
      className={clsx(
        'rounded-b-3xl border-gray-300 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-950 lg:rounded-none lg:border-b lg:bg-transparent dark:lg:bg-transparent',
        className,
      )}
    >
      {/* mobile header */}
      <div className='flex lg:hidden'>
        <Logo />
      </div>

      {/* desktop header */}
      <div className='hidden h-full items-center justify-between lg:flex'>
        <p className='text-xl font-bold'>{pathTitle}</p>
        <div className='hidden items-center gap-4 lg:flex'>
          <Input
            className='w-72'
            placeholder='Search by title, content, or tags'
            radius='md'
            startContent={<IoSearchOutline size={20} />}
            variant='faded'
          />
          <IoSettingsOutline
            className='cursor-pointer'
            focusable={true}
            size={26}
          />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
