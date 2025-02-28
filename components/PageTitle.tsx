'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';

type PageTitleProps = {
  tag?: string;
  replace?: boolean;
  title?: string;
  className?: string;
};
export default function PageTitle({
  tag,
  replace = false,
  title,
  className,
}: PageTitleProps) {
  const pathName = usePathname();
  const pathTitle: string =
    siteConfig.pathTitles[
      pathName?.split('/')[1] as keyof typeof siteConfig.pathTitles
    ];

  return (
    <>
      <p
        className={clsx(
          'mt-4 text-2xl font-bold text-gray-500 dark:text-gray-400',
          className,
        )}
      >
        {replace ? title : pathTitle}{' '}
        <span className='text-black dark:text-white'>{tag}</span>
      </p>
    </>
  );
}
