'use client'
type Props = {
  params: Promise<{ noteId: string }>;
};

import { use, useContext } from 'react';

import NotesBody from '@/components/NotesBody';
import { NotesContext } from '@/contexts/NotesContext';
export default function NoteIdPage({ params }: Props) {
  const { notes } = useContext(NotesContext);
  const p = use(params);
  const id = p.noteId;
  const note = notes[notes.findIndex((note) => note.id === Number(id))];

  if (!note) return <div>That note does not exist</div>;

  return <NotesBody note={note} />;
}
