import NoteActions from '@/components/NoteActions';
import NotesSection from '@/components/NotesSection';
import { notes } from '@/temp/notes';

export default function createLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <aside className='hidden h-full w-1/5 min-w-[300px] flex-shrink-0 overflow-hidden lg:flex'>
        <NotesSection
          className='h-full'
          notes={notes.filter((note) => !note.isArchived)}
        />
      </aside>
      <main className='flex-1 overflow-y-auto'>{children}</main>
      <aside className='hidden h-full w-1/5 min-w-[300px] flex-shrink-0 overflow-hidden lg:flex'>
        <NoteActions />
      </aside>
    </div>
  );
}
