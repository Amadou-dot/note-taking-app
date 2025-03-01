'use client';
import { Input } from '@heroui/input';
import { Tooltip } from '@heroui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';

import MobileNav from './MobileNav';
import PageTitle from './PageTitle';

type HeaderProps = {
  className?: string;
};
export default function Header({ className }: HeaderProps) {
  const pathName = usePathname();
  let tag: null | string = null;

  // if on the tags page, get the tag from the url (tags/[tag])
  if (pathName?.includes('tags')) {
    tag = pathName.split('/')[2];
  }

  return (
    <div className={clsx('lg:border-b dark:border-gray-800 px-4', className)}>
      {/* mobile header */}
      <MobileNav />

      {/* desktop header */}
      <div className='hidden h-full items-center justify-between lg:flex'>
        <PageTitle
          replace={(tag && true) || false}
          tag={(tag && tag) || undefined}
          title={(tag && 'Notes Tagged: ') || undefined}
        />
        <div className='hidden items-center gap-10 lg:flex'>
          <Input
            className='w-72'
            placeholder='Search by title, content, or tags'
            radius='sm'
            startContent={<IoSearchOutline size={20} />}
            variant='faded'
          />
          <Tooltip content='Settings' delay={500} radius='sm'>
            <Link href='/settings'>
              <IoSettingsOutline
                className='cursor-pointer'
                focusable={true}
                size={26}
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
