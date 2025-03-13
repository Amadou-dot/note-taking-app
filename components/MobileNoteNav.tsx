import { Button } from '@heroui/button';
import Link from 'next/link';
import { useState } from 'react';
import {
  IoArchiveOutline,
  IoArrowBack,
  IoRefreshOutline,
  IoTrashOutline,
} from 'react-icons/io5';

import ConfirmationModal from './ConfirmationModal';

type MobileNoteNavProps = {
  isArchived?: boolean;
  onSave: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onRestore: () => void;
};

/**
 * MobileNoteNav component provides a navigation bar for mobile devices with options to save, delete, archive, or restore a note.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isArchived - Indicates if the note is archived.
 * @param {Function} props.onSave - Callback function to handle saving the note.
 * @param {Function} props.onDelete - Callback function to handle deleting the note.
 * @param {Function} props.onArchive - Callback function to handle archiving the note.
 * @param {Function} props.onRestore - Callback function to handle restoring the note.
 *
 * @returns {JSX.Element} The rendered MobileNoteNav component.
 */
export default function MobileNoteNav({
  isArchived,
  onSave,
  onDelete,
  onArchive,
  onRestore,
}: MobileNoteNavProps): JSX.Element {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const backUrl = isArchived ? '/archive' : '/all';

  return (
    <>
      <nav className='flex items-center justify-between border-b border-gray-300 p-4 dark:border-gray-800 lg:hidden'>
        <Button
          as={Link}
          href={backUrl}
          radius='sm'
          startContent={<IoArrowBack size={24} />}
          variant='light'
        />

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
            onPress={() => setIsArchiveModalOpen(true)}
          />
          <Button
            aria-label='Delete note'
            color='danger'
            radius='sm'
            startContent={<IoTrashOutline size={24} />}
            variant='light'
            onPress={() => setIsDeleteModalOpen(true)}
          />
          <Button
            color='primary'
            radius='sm'
            size='lg'
            variant='light'
            onPress={onSave}
          >
            Save Note
          </Button>
        </div>
      </nav>

      <ConfirmationModal
        body='Are you sure you want to delete this note? This action cannot be undone.'
        confirmColor='danger'
        confirmText='Delete'
        isOpen={isDeleteModalOpen}
        title='Delete Note'
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
      />

      <ConfirmationModal
        body={
          isArchived
            ? 'Are you sure you want to restore this note?'
            : 'Are you sure you want to archive this note?'
        }
        confirmColor={isArchived ? 'primary' : 'warning'}
        confirmText={isArchived ? 'Restore' : 'Archive'}
        isOpen={isArchiveModalOpen}
        title={isArchived ? 'Restore Note' : 'Archive Note'}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={isArchived ? onRestore : onArchive}
      />
    </>
  );
}
