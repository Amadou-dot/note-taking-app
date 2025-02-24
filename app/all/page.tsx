import { FaCirclePlus } from 'react-icons/fa6';

import Bounded from '@/components/Bounded';
import EmptyNotes from '@/components/EmptyNotes';
import MobileNav from '@/components/MobileNav';
import NotesBody from '@/components/NotesBody';
import NotesSection from '@/components/NotesSection';
export default function page() {
  const notes = [];

  return (
    <Bounded className='h-full lg:grid lg:grid-cols-[300px_1fr]'>
      <div className='lg:hidden'>
        {!notes.length && <EmptyNotes />}
        <FaCirclePlus
          className='fixed bottom-24 right-4 cursor-pointer text-white'
          color='blue'
          size={48}
        />
      </div>
      <MobileNav />
      <NotesSection className='col-start-1 hidden lg:block' />
      <NotesBody className='col-start-2 hidden lg:block' />
    </Bounded>
  );
}
