import clsx from 'clsx';
import { TbFeatherFilled } from 'react-icons/tb';

import { fontRouge } from '@/config/fonts';
interface LogoProps {
  size?: number;
  className?: string;
}
export const Logo = ({ size, className }: LogoProps) => {
  return (
    <p
      className={clsx(
        'pointer-events-none flex select-none items-center gap-1',
        className,
      )}
    >
      <TbFeatherFilled className='text-blue-600' size={size} />{' '}
      <span className={clsx(fontRouge.className, 'text-3xl')}>Notes</span>
    </p>
  );
};
