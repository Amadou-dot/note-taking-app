import { Button } from '@heroui/button';
import Link from 'next/link';
import {
  IoArchiveOutline,
  IoArrowBack,
  IoRefreshOutline,
  IoTrashOutline,
} from 'react-icons/io5';

type MobileNoteNavProps = {
  isArchived?: boolean;
  onSave?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
};

export default function MobileNoteNav({
  isArchived,
  onSave,
  onDelete,
  onArchive,
}: MobileNoteNavProps) {
  const backUrl = isArchived ? '/archive' : '/all';

  return (
    <nav className='fixed left-0 right-0 top-20 z-50 flex items-center justify-between border-b border-gray-300 p-4 dark:border-gray-800 lg:hidden'>
      <div className='flex items-center gap-4'>
        <Link
          className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-900'
          href={backUrl}
        >
          <IoArrowBack size={24} />
        </Link>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          aria-label={isArchived ? 'Unarchive note' : 'Archive note'}
          color='warning'
          radius='sm'
          startContent={
            isArchived ? (
              <IoRefreshOutline size={24} />
            ) : (
              <IoArchiveOutline size={24} />
            )
          }
          variant='light'
          onPress={onArchive}
        />
        <Button
          aria-label='Delete note'
          color='danger'
          radius='sm'
          startContent={<IoTrashOutline size={24} />}
          variant='light'
          onPress={onDelete}
        />
        <Button color='primary' radius='sm' variant='light' onPress={onSave}>
          Save Note
        </Button>
      </div>
    </nav>
  );
}
