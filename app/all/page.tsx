import Bounded from '@/components/Bounded';
import NotesBody from '@/components/NotesBody';
import NotesSection from '@/components/NotesSection';

export default function page() {
  return (
    <Bounded>
      <NotesBody className='col-start-2 hidden lg:block' />
      <NotesSection className='lg:hidden' />
    </Bounded>
  );
}
