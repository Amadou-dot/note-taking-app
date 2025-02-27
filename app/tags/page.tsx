import Bounded from '@/components/Bounded';
import EmptyNotes from '@/components/EmptyNotes';
import TagsList from '@/components/TagsList';
import { notes } from '@/temp/notes';

export default function tags() {
  return (
    <Bounded>
      <div className='px-4 lg:hidden'>
        <p className='mt-4 text-2xl font-bold'>Tags</p>
        {!notes.length && <EmptyNotes />}
      </div>
      <div className='h-[calc(100vh-12rem)] flex-1 overflow-y-auto scrollbar-hide'>
        <TagsList className='mt-4 px-4 text-lg *:border-b *:py-2 lg:hidden ' />
      </div>
    </Bounded>
  );
}
