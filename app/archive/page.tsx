'use client'
import { useContext } from 'react';

import Bounded from '@/components/Bounded';
import EmptyNotes from '@/components/EmptyNotes';
import NotesBody from '@/components/NotesBody';
import NotesSection from '@/components/NotesSection';
import { NotesContext } from '@/contexts/NotesContext';

export default function ArchivePage() {
  const { notes } = useContext(NotesContext);

  return (
    <Bounded>
      <p className='px-4 lg:hidden'>{!notes.length && <EmptyNotes />}</p>

      <NotesBody className='col-start-2 hidden lg:block' />
      <NotesSection
        showArchived
        className='lg:hidden'
        message='All your archived notes are stored here. You can restore or delete them anytime'
      />
    </Bounded>
  );
}
