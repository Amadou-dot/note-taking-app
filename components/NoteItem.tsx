import { Chip } from '@heroui/chip';
import Link from 'next/link';
import React from 'react';

import { getTextPreview } from '@/helpers/getPreviewText';
import { Note } from '@/types/Note';

type NoteItemProps = {
  note: Note;
};

/**
 * A functional component that renders a note item.
 *
 * @param {NoteItemProps} {note} - A note object to be rendered.
 * @returns {JSX.Element} The rendered note item component.
 */
export default function NoteItem({ note }: NoteItemProps): JSX.Element {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(note.last_updated));
  const url = note.isArchived ? `/archive/${note.id}` : `/all/${note.id}`;

  // Using client-side only textPreview to avoid hydration errors
  const [textPreview, setTextPreview] = React.useState<string>('');

  // Set preview on client side only
  React.useEffect(() => {
    setTextPreview(getTextPreview(note.body));
  }, [note.body]);

  return (
    <li aria-label={`Open ${note.title}`}>
      <Link
        className='mb-2 flex h-full w-full flex-col gap-3 rounded-md p-2 hover:bg-slate-200 focus:bg-slate-200 dark:text-slate-400 dark:outline-none dark:hover:bg-slate-900 dark:focus:bg-transparent dark:focus:ring dark:focus:ring-slate-900'
        href={url}
        tabIndex={0}
      >
        <span className='text-lg font-bold text-black dark:text-white'>
          {note.title}
        </span>
        {textPreview && (
          <span className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>
            {textPreview}
          </span>
        )}
        <span className='flex gap-2 font-semibold'>
          {note.tags?.slice(0, 3).map((tag) => (
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
