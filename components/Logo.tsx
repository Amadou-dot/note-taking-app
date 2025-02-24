import clsx from 'clsx';

import LogoSVG from '../public/quill-pen.svg';

import { fontRouge } from '@/config/fonts';
interface LogoProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}
export const Logo = ({
  width = 48,
  height = 48,
  fill = '#1d4ed8   ',
  className,
}: LogoProps) => {
  return (
    <p
      className={clsx(
        'pointer-events-none flex select-none items-center gap-1',
        className,
      )}
    >
      <LogoSVG fill={fill} height={height} width={width} />{' '}
      <span className={clsx(fontRouge.className, 'text-3xl text-blue-')}>Notes</span>
    </p>
  );
};
