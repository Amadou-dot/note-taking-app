'use client';

import { Button } from '@heroui/button';
import Link from 'next/link';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Bounded from '@/components/Bounded';
import NotesBody from '@/components/NotesBody';
import { Note } from '@/types/Note';
import { handleSaveNote } from '@/helpers/notesDB';

export default function Create() {
  const [note, setNote] = useState<Partial<Note>>({
    title: '',
    body: '',
    tags: [],
    last_updated: new Date().toDateString(),
    isArchived: false,
  });

  const handleNoteChange = (updatedFields: Partial<Note>) => {
    setNote((prev) => ({
      ...prev,
      ...updatedFields,
      last_updated: new Date().toDateString(),
    }));
  };

  return (
    <Bounded className='px-4'>
      <div>
        <nav className='mt-4 flex items-center justify-between '>
          <Button
            as={Link}
            href='/'
            radius='sm'
            size='lg'
            startContent={<IoArrowBack size={24} />}
            variant='light'
          >
            Cancel
          </Button>
          <Button
            color='primary'
            radius='sm'
            size='lg'
            variant='light'
            onPress={() => handleSaveNote(note)}
          >
            Save Note
          </Button>
        </nav>

        <NotesBody readOnly={false} onNoteChange={handleNoteChange} />
      </div>
    </Bounded>
  );
}
