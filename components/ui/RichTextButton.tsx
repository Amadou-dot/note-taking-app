import clsx from 'clsx';

interface RichTextButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
  isActive?: boolean;
}
/**
 * A button component for rich text editing.
 *
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {() => void} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.title - The title attribute for the button, providing additional information on hover.
 * @param {string} props.className - Additional CSS classes to apply to the button.
 * @param {boolean} props.isActive - A flag indicating whether the button is in an active state.
 *
 * @returns {JSX.Element} The rendered button component.
 */
export default function RichTextButton({
  children,
  onClick,
  title,
  className,
  isActive,
}: RichTextButtonProps): JSX.Element {
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
