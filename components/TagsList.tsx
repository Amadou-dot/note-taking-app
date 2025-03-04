'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import { IoPricetagOutline } from 'react-icons/io5';

import { NotesContext } from '@/contexts/NotesContext';
import { Note } from '@/types/Note';

type TagsListProps = {
  className?: string;
};
export default function TagsList({ className }: TagsListProps) {
  const { notes } = useContext(NotesContext);

  const tags = getNoteTags(notes);

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {Array.from(new Set(tags)).map((tag) => (
        <Link
          key={tag}
          className='flex items-center gap-3 rounded-md px-1 py-2 hover:bg-gray-200 dark:hover:bg-gray-800'
          href={`/tags/${tag}`}
        >
          <IoPricetagOutline size={20} /> {tag}
        </Link>
      ))}
    </div>
  );
}

export const getNoteTags = (notes: Note[]) => {
  if (!notes) return [];
  const tagsArr = notes.map(({ tags }) => tags).flat();

  return tagsArr;
};
