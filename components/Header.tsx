import clsx from 'clsx';

import { Logo } from './Logo';
import { ThemeSwitch } from './theme-switch';

type HeaderProps = {
  className?: string;
};
export default function Header({ className }: HeaderProps) {
  return (
    <div
      className={clsx(
        'rounded-b-3xl border-gray-300 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-950 lg:rounded-none lg:border-b lg:bg-transparent dark:lg:bg-transparent',
        'flex gap-4',
        className,
      )}
    >
      <div className='flex lg:hidden'>
        <Logo />
      </div>
      <ThemeSwitch />
    </div>
  );
}
