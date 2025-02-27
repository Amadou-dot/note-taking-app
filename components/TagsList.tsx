import clsx from 'clsx';
import Link from 'next/link';
import { IoPricetagOutline } from 'react-icons/io5';

import { getAllTags } from '@/helpers/getAllTags';
type TagsListProps = {
  className?: string;
};
export default function TagsList({ className }: TagsListProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {Array.from(getAllTags()).map((tag) => (
        <Link
          key={tag}
          className='flex items-center gap-3 hover:bg-gray-200 py-2 rounded-md px-1 dark:hover:bg-gray-800'
          href={`/tags/${tag}`}
        >
          <IoPricetagOutline size={20} /> {tag}
        </Link>
      ))}
    </div>
  );
}
