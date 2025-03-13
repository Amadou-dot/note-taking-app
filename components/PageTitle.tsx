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
/**
 * Component to display a page title with optional tag and replacement title.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.tag - The tag to display alongside the title.
 * @param {boolean} [props.replace=false] - Flag to determine if the title should be replaced. Defaults to false.
 * @param {string} props.title - The title to display.
 * @param {string} props.className - Additional class names for styling.
 * @returns {JSX.Element} The rendered page title component.
 */
export default function PageTitle({
  tag,
  replace = false,
  title,
  className,
}: PageTitleProps): JSX.Element {
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
