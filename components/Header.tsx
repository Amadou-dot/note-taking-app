'use client';
import { Input } from '@heroui/input';
import clsx from 'clsx';
import Link from 'next/link';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import {Tooltip} from "@heroui/tooltip";
import { Logo } from './Logo';
import PageTitle from './PageTitle';
3;
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
        <PageTitle
          replace={(tag && true) || false}
          tag={(tag && tag) || undefined}
          title={(tag && 'Notes Tagged: ') || undefined}
        />
        <div className='hidden items-center gap-10 lg:flex'>
          <Input
            className='w-72'
            placeholder='Search by title, content, or tags'
            radius='md'
            startContent={<IoSearchOutline size={20} />}
            variant='faded'
          />
          <Tooltip content='Settings' radius='sm'>
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
