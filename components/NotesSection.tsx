import { Button } from '@heroui/button';
import clsx from 'clsx';

import EmptyNotes from './EmptyNotes';

type NotesSectionProps = {
  className?: string;
};

export default function NotesSection({ className }: NotesSectionProps) {
  const notes = [];

  return (
    <div
      className={clsx(
        'w-full border-r border-gray-300 p-4 dark:border-gray-800',
        className,
      )}
    >
      <Button color='primary'>Create New Note</Button>
      {!notes.length && <EmptyNotes />}
    </div>
  );
}
