import clsx from 'clsx';

import LogoSVG from '../public/quill-pen.svg';

import { fontRouge } from '@/config/fonts';
interface LogoProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

/**
 * A functional component that renders a logo with customizable dimensions, fill color, and additional CSS classes.
 *
 * @param {Object} props - The properties object.
 * @param {number} [props.width=48] - The width of the logo SVG.
 * @param {number} [props.height=48] - The height of the logo SVG.
 * @param {string} [props.fill='#1d4ed8'] - The fill color of the logo SVG.
 * @param {string} [props.className] - Additional CSS classes to apply to the container element.
 *
 * @returns {JSX.Element} The rendered logo component.
 */
export const Logo = ({
  width = 48,
  height = 48,
  fill = '#1d4ed8   ',
  className,
}: LogoProps): JSX.Element => {
  return (
    <p
      className={clsx(
        'pointer-events-none flex select-none items-center gap-1',
        className,
      )}
    >
      <LogoSVG fill={fill} height={height} width={width} />{' '}
      <span className={clsx(fontRouge.className, 'text-blue- text-3xl')}>
        Notes
      </span>
    </p>
  );
};
