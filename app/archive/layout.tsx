import NotesSection from '@/components/NotesSection';
import { notes } from '@/temp/notes';

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar area with a fixed height */}
      <aside className='hidden h-full w-1/5 min-w-[300px] flex-shrink-0 overflow-hidden lg:flex'>
        <NotesSection
          className='h-full'
          message='All your archived notes are stored here. You can restore or delete them anytime'
          notes={notes.filter((note) => note.isArchived)}
        />
      </aside>
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
