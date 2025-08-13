'use client';

import { Button } from '@heroui/button';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'react-toastify';

import Bounded from '@/components/Bounded';
import NotesBody from '@/components/NotesBody';
import { NotesContext } from '@/contexts/NotesContext';
import { apiClient } from '@/helpers/apiClient';
import { Note } from '@/types/Note';

export default function CreatePage() {
  const { refreshNotes } = useContext(NotesContext);
  const [note, setNote] = useState<Partial<Note>>({
    title: '',
    body: '',
    tags: [],
    last_updated: new Date().toISOString(),
    isArchived: false,
  });

  const handleNoteChange = (updatedFields: Partial<Note>) => {
    setNote((prev) => ({
      ...prev,
      ...updatedFields,
      last_updated: new Date().toISOString(),
    }));
  };
  const createNote = async () => {
    try {
      // Ensure all required fields are present
      const noteToCreate = {
        title: note.title || '',
        body: note.body || '',
        tags: note.tags || [],
        isArchived: note.isArchived || false,
      };

      await apiClient.createNote(noteToCreate);
      await refreshNotes(); // Refresh the notes list
      toast.success('Note saved successfully!');
      
      // Reset the form
      setNote({
        title: '',
        body: '',
        tags: [],
        last_updated: new Date().toISOString(),
        isArchived: false,
      });
    } catch {
      toast.error('Error saving note');
    }
  };

  return (
    <Bounded className='px-4'>
      <div>
        <nav className='mt-4 flex items-center justify-between'>
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
            onPress={createNote}
          >
            Save Note
          </Button>
        </nav>

        <NotesBody note={note} readOnly={false} onNoteChange={handleNoteChange} />
      </div>
    </Bounded>
  );
}
