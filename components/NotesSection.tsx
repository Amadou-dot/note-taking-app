import { Button } from '@heroui/button';
import clsx from 'clsx';
import { IoAddOutline } from 'react-icons/io5';

import EmptyNotes from './EmptyNotes';
import NoteList from './NoteList';

import { Note } from '@/types/Note';

type NotesSectionProps = {
  className?: string;
  notes: Note[];
};

export default function NotesSection({ className, notes }: NotesSectionProps) {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col border-r border-gray-300 p-4 dark:border-gray-800',
        className,
      )}
    >
      <Button
        className='hidden w-full lg:flex'
        color='primary'
        size='lg'
        startContent={<IoAddOutline size={22} />}
      >
        Create New Note
      </Button>
      {/* This container will scroll when the list content overflows */}
      <div className='mt-4 flex-1 overflow-y-auto scrollbar-hide'>
        {!notes.length && <EmptyNotes />}
        {notes.length && <NoteList notes={notes} />}
      </div>
    </div>
  );
}
