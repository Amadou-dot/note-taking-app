import NotesSection from '@/components/NotesSection';

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <aside className='hidden h-full w-1/5 min-w-[300px] flex-shrink-0 overflow-hidden lg:flex'>
        <NotesSection className='h-full' />
      </aside>
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
