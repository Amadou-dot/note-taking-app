import { Chip } from '@heroui/chip';
import Link from 'next/link';

import { Note } from '@/types/Note';

type NoteItemProps = {
  note: Note;
};
export default function NoteItem({ note }: NoteItemProps) {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(note.last_updated);

  return (
    <li aria-label={`Open ${note.title}`}>
      <Link
        className='mb-2 flex h-full w-full flex-col gap-3 rounded-md p-2 hover:bg-slate-200 focus:bg-slate-200 dark:text-slate-400 dark:outline-none dark:hover:bg-slate-900 dark:focus:bg-transparent dark:focus:ring dark:focus:ring-slate-900'
        href={`/all/${note.id}`}
        tabIndex={0}
      >
        <span className='text-lg font-bold text-black dark:text-white'>
          {note.title}
        </span>
        <span className='flex gap-2 font-semibold'>
          {note.tags.slice(0, 3).map((tag) => (
            <Chip key={tag} radius='sm' size='lg' variant='solid'>
              {tag}
            </Chip>
          ))}
        </span>
        <span>{date}</span>
      </Link>
    </li>
  );
}
