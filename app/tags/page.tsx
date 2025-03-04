import Bounded from '@/components/Bounded';
import TagsList from '@/components/TagsList';

export default function TagsPage() {
  return (
    <Bounded>
      <div className='h-[calc(100vh-12rem)] flex-1 overflow-y-auto scrollbar-hide'>
        <TagsList className='mt-4 px-4 text-lg *:border-b *:py-2 lg:hidden' />
      </div>
    </Bounded>
  );
}
