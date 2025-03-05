'use client';
import { Button } from '@heroui/button';
import { useState } from 'react';
import { IoArchiveOutline, IoTrashBinOutline } from 'react-icons/io5';

import ConfirmationModal from './ConfirmationModal';

import { Note } from '@/types/Note';

type NoteActionProps = {
  note: Note;
  onSave?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onRestore?: () => void;
};

export default function NoteActions({
  note,
  onSave,
  onDelete,
  onArchive,
  onRestore,
}: NoteActionProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  return (
    <div className='hidden border-l dark:border-gray-800 lg:flex flex-col items-center relative min-h-[calc(100vh-theme(spacing.16))]'>
      <div className='flex flex-col items-center gap-8 px-4 *:w-full mt-4 w-full'>
        <Button
          radius='sm'
          startContent={<IoArchiveOutline />}
          variant='ghost'
          onPress={onSave}
        >
          Save Note
        </Button>
        <Button
          radius='sm'
          startContent={<IoArchiveOutline />}
          variant='ghost'
          onPress={() =>
            note.isArchived
              ? setIsArchiveModalOpen(true)
              : setIsArchiveModalOpen(true)
          }
        >
          {note.isArchived ? 'Restore' : 'Archive'} Note
        </Button>
        <Button
          radius='sm'
          startContent={<IoTrashBinOutline />}
          variant='ghost'
          onPress={() => setIsDeleteModalOpen(true)}
        >
          Delete Note
        </Button>

        <ConfirmationModal
          body='Are you sure you want to delete this note? This action cannot be undone.'
          confirmColor='danger'
          confirmText='Delete'
          isOpen={isDeleteModalOpen}
          title='Delete Note'
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={onDelete || (() => {})}
        />

        <ConfirmationModal
          body={
            note.isArchived
              ? 'Are you sure you want to restore this note?'
              : 'Are you sure you want to archive this note?'
          }
          confirmColor={note.isArchived ? 'primary' : 'warning'}
          confirmText={note.isArchived ? 'Restore' : 'Archive'}
          isOpen={isArchiveModalOpen}
          title={note.isArchived ? 'Restore Note' : 'Archive Note'}
          onClose={() => setIsArchiveModalOpen(false)}
          onConfirm={
            note.isArchived ? onRestore || (() => {}) : onArchive || (() => {})
          }
        />
      </div>
    </div>
  );
}
