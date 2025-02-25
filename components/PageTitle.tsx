'use client';

import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';

export default function PageTitle() {
  const pathName = usePathname();
  const pathTitle: string =
    siteConfig.pathTitles[
      pathName.split('/')[1] as keyof typeof siteConfig.pathTitles
    ];

  return <p className='mt-4 text-2xl font-bold'>{pathTitle}</p>;
}
