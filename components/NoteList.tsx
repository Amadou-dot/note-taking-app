import NoteItem from './NoteItem';

import { Note } from '@/types/Note';

type NoteListProps = {
  notes: Note[];
};
/**
 * A functional component that renders a list of notes.
 *
 * @component
 * @param {NoteListProps} notes - An array of note objects to be rendered.
 * @returns {JSX.Element} A list of note items.
 */
export default function NoteList({ notes }: NoteListProps): JSX.Element {
  return (
    <ul
      className='flex w-full flex-col gap-4 *:border-b *:border-gray-300 last:mb-56 dark:*:border-gray-800'
      role='listbox'
      tabIndex={0}
    >
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
