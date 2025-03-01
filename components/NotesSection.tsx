import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import clsx from 'clsx';
import { IoAddOutline } from 'react-icons/io5';
import Link from 'next/link';

import EmptyNotes from './EmptyNotes';
import NoteList from './NoteList';

import { Note } from '@/types/Note';

type NotesSectionProps = {
  className?: string;
  notes: Note[];
  message?: string;
  hideButton?: boolean;
  hideEmptyNote?: boolean;
};

export default function NotesSection({
  className,
  notes,
  message,
  hideButton,
  hideEmptyNote,
}: NotesSectionProps) {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col border-r border-gray-300 px-4 dark:border-gray-800',
        className,
      )}
    >
      {!hideButton && (
        <Button
          as={Link}
          className='hidden w-full lg:flex mt-4'
          color='primary'
          href='/create'
          radius='sm' size='lg' startContent={<IoAddOutline size={22} />}
        >
          Create New Note
        </Button>
      )}
      {message && (
        <span className='mt-2 text-gray-500'>
          <Alert hideIcon description={message} radius='sm' variant='faded' />
        </span>
      )}
      {/* This container will scroll when the list content overflows */}
      <div className='mt-4 flex-1 overflow-y-auto scrollbar-hide'>
        {!notes.length && !hideEmptyNote && <EmptyNotes />}
        {notes.length > 0 ? <NoteList notes={notes} /> : null}
      </div>
    </div>
  );
}
