import clsx from 'clsx';

type BoundedProps = {
  children: React.ReactNode;
  className?: string;
};
export default function Bounded({ children, className }: BoundedProps) {
  return <div className={clsx('relative h-full max-h-screen overflow-hidden', className)}>{children}</div>;
}
