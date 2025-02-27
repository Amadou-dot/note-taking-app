import { Button } from '@heroui/button';
import { IoArchiveOutline, IoTrashBinOutline } from 'react-icons/io5';

import { Note } from '@/types/Note';

type NoteActionProps = {
  note: Note;
};
export default function NoteActions({ note }: NoteActionProps) {
  return (
    <div className='mt-10 hidden flex-col items-center gap-8 border-l px-4 *:w-full dark:border-gray-800 lg:flex'>
      <Button radius='sm' startContent={<IoArchiveOutline />} variant='ghost'>
        Save Note
      </Button>
      <Button radius='sm' startContent={<IoArchiveOutline />} variant='ghost'>
        {note.isArchived ? 'Restore' : 'Archive'} Note
      </Button>
      <Button radius='sm' startContent={<IoTrashBinOutline />} variant='ghost'>
        Delete Note
      </Button>
    </div>
  );
}
