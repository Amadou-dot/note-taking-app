import '@/styles/globals.css';
import { Tooltip } from '@heroui/tooltip';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';

import { Providers } from './providers';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          'max-h-screen overflow-hidden',
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative h-screen'>
            <div className='h-screen lg:grid lg:grid-cols-[250px_1fr] lg:grid-rows-[100px_1fr] '>
              <Sidebar className='hidden lg:col-start-1 lg:row-span-2 lg:block' />
              <Header className='lg:col-start-2 lg:row-span-1 lg:block' />
              <main className='col-start-2 row-start-2'>
                {children}
                <Tooltip content='Create a new note' delay={500} radius='sm'>
                  <Link href='/create'>
                    <FaCirclePlus
                      className='fixed bottom-14 right-10 cursor-pointer text-white lg:hidden'
                      color='blue'
                      size={48}
                    />
                  </Link>
                </Tooltip>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
