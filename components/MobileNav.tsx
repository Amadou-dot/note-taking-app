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

export default function MobileNav() {
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
