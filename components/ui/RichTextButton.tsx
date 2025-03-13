import clsx from 'clsx';

interface RichTextButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
  isActive?: boolean;
}
export default function RichTextButton({
  children,
  onClick,
  title,
  className,
  isActive,
}: RichTextButtonProps) {
  return (
    <button
      className={clsx(
        'rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700',
        isActive && 'bg-gray-200 dark:bg-gray-700',
        className,
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
