type Props = {
  params: Promise<{ noteId: string }>;
};

import NotesBody from '@/components/NotesBody';
import { notes } from '@/temp/notes';
export default async function page({ params }: Props) {
  const p = await params;
  const id = p.noteId;
  const note = notes[notes.findIndex((note) => note.id === Number(id))];

  if (!note) return <div>That note does not exist</div>;

  return <NotesBody note={note} />;
}
