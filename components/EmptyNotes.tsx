type EmptyNotesProps = {
  className?: string;
};
import { Alert } from '@heroui/alert';
import clsx from 'clsx';

/**
 * A functional component that displays a message indicating that there are no notes yet.
 * It uses the `Alert` component to show the message.
 *
 * @param {EmptyNotesProps} props - The props for the component.
 * @param {string} props.className - Additional class names to apply to the container div.
 * @returns {JSX.Element} The rendered component.
 */
export default function EmptyNotes({ className }: EmptyNotesProps): JSX.Element {
  return (
    <div className={clsx('mt-4 sm:border-b sm:border-gray-300 sm:dark:border-gray-800 lg:border-none sm:py-4', className)}>
      <Alert
        hideIcon
        description="You don't have any notes yet. Start a new note to capture your
        thoughts and ideas."
      />
    </div>
  );
}
