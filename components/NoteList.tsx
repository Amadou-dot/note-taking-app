import NoteItem from './NoteItem';

import { Note } from '@/types/Note';

type NoteListProps = {
  notes: Note[];
};
export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul
      className='flex w-full flex-col gap-4 *:border-b *:border-gray-300 last:mb-56 dark:*:border-gray-800'
      role='listbox'
      tabIndex={0}
    >
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </ul>
  );
}
