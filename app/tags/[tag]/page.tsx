import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '@heroui/button';

import NotesSection from '@/components/NotesSection';
import PageTitle from '@/components/PageTitle';
import { notes } from '@/temp/notes';

type Props = {
  params: Promise<{ tag: string }>;
};
export default async function page({ params }: Props) {
  const p = await params;
  const tag = p.tag;

  // only get the tags from notes that are NOT archived
  const taggedNotes = notes.filter(
    (note) => note.tags.includes(tag) && !note.isArchived,
  );

  return (
    <div>
      <div className='p-4 lg:hidden'>
        <Button
          as={Link}
          color='primary'
          href='/tags'
          radius='sm'
          startContent={<IoArrowBack size={24} />}
          variant='light'
        >
          Go back
        </Button>
        <PageTitle replace tag={tag} title='Notes Tagged: ' />
      </div>
      <NotesSection
        hideButton
        hideEmptyNote={taggedNotes.length === 0}
        message={
          taggedNotes.length === 0
            ? 'No notes with that tag were found'
            : undefined
        }
        notes={taggedNotes}
      />
    </div>
  );
}
