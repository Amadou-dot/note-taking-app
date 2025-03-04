import { Button } from '@heroui/button';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

import NotesSection from '@/components/NotesSection';

type Props = {
  params: Promise<{ tag: string }>;
};
export default async function page({ params }: Props) {
  const p = await params;
  const tag = p.tag;

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
      </div>
      <NotesSection hideButton tag={tag} />
    </div>
  );
}
