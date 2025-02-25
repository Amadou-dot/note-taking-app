import { FaCirclePlus } from 'react-icons/fa6';

import Bounded from '@/components/Bounded';
import EmptyNotes from '@/components/EmptyNotes';
import NotesBody from '@/components/NotesBody';
import NotesSection from '@/components/NotesSection';
import PageTitle from '@/components/PageTitle';
import { notes } from '@/temp/notes';

export default function page() {
  return (
    <Bounded className='h-full lg:grid lg:grid-cols-[300px_1fr] max-h-screen overflow-hidden'>
      <div className='lg:hidden px-4'>
        <PageTitle />
        {!notes.length && <EmptyNotes />}
        <FaCirclePlus
          className='fixed bottom-24 right-4 cursor-pointer text-white'
          color='blue'
          size={48}
        />
      </div>

      <NotesBody className='col-start-2 hidden lg:block' />
      <NotesSection className='lg:hidden' notes={notes.filter(note => note.isArchived)}/>
      
    </Bounded>
  );
}
