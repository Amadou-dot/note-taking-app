type EmptyNotesProps = {
  className?: string;
};
import { Alert } from '@heroui/alert';
import clsx from 'clsx';
export default function EmptyNotes({ className }: EmptyNotesProps) {
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
