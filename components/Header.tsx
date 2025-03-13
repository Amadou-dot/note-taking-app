'use client';
import { Tooltip } from '@heroui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import MobileNav from './MobileNav';
import PageTitle from './PageTitle';
import SearchBar from './SearchBar';

type HeaderProps = {
  className?: string;
};

/**
 * Header component that displays a navigation bar with a search bar and settings link.
 *
 * @param {HeaderProps} props - The properties for the Header component.
 * @param {string} props.className - Additional class names for styling the header.
 *
 * @returns {JSX.Element} The rendered Header component.
 *
 * @remarks
 * - If the current path includes 'tags', it extracts the tag from the URL.
 * - The search bar allows users to search for notes, navigating to the search page with the query.
 * - The settings link navigates to the settings page.
 *
 * @component
 * @example
 * ```tsx
 * <Header className="custom-class" />
 * ```
 */
export default function Header({ className }: HeaderProps): JSX.Element {
  const pathName = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  let tag: null | string = null;

  // if on the tags page, get the tag from the url (tags/[tag])
  if (pathName?.includes('tags')) {
    tag = pathName.split('/')[2];
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    // Optional: Add debounce here for better performance
    if (value.trim().length > 0) {
      // Navigate to the search page with the query
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
    if (!value.trim().length) {
      // Navigate to the search page with the query
      router.push(`/search`);
    }
  };

  return (
    <div className={clsx('px-4 dark:border-gray-800 lg:border-b', className)}>
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
          <SearchBar value={searchQuery} onValueChange={handleSearch} />
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
