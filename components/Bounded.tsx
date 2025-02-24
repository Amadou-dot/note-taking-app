import clsx from 'clsx';

type BoundedProps = {
  children: React.ReactNode;
  className?: string;
};
export default function Bounded({ children, className }: BoundedProps) {
  return <div className={clsx('relative px-3', className)}>{children}</div>;
}
