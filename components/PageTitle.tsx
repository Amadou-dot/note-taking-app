'use client';

import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';

type PageTitleProps = {
  tag?: string;
  replace?: boolean;
  title?: string;
};
export default function PageTitle({
  tag,
  replace = false,
  title,
}: PageTitleProps) {
  const pathName = usePathname();
  const pathTitle: string =
    siteConfig.pathTitles[
      pathName.split('/')[1] as keyof typeof siteConfig.pathTitles
    ];

  return (
    <>
      <p className='mt-4 text-2xl font-bold text-gray-600 dark:text-gray-500'>
        {replace ? title : pathTitle}{' '}
        <span className='text-black dark:text-white'>{tag}</span>
      </p>
    </>
  );
}
