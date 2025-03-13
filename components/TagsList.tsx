'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import { IoPricetagOutline } from 'react-icons/io5';

import { NotesContext } from '@/contexts/NotesContext';
import { getNoteTags } from '@/helpers/getNoteTags';

type TagsListProps = {
  className?: string;
};
/**
 * A component that renders a list of tags.
 *
 * @param {TagsListProps} props - The props for the TagsList component.
 * @param {string} props.className - Additional class names to apply to the container div.
 * @returns {JSX.Element} The rendered list of tags.
 */
export default function TagsList({ className }: TagsListProps): JSX.Element {
  const { notes } = useContext(NotesContext);

  const tags = getNoteTags(notes);

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {Array.from(new Set(tags)).map((tag) => (
        <Link
          key={tag}
          className='flex items-center gap-3 rounded-sm px-1 py-2 hover:bg-gray-200 dark:hover:bg-gray-800'
          href={`/tags/${tag}`}
        >
          <IoPricetagOutline size={20} /> {tag}
        </Link>
      ))}
    </div>
  );
}
