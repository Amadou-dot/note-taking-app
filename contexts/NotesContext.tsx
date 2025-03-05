'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { getAllNotes } from '@/helpers/notesDB';
import { Note } from '@/types/Note';

export const NotesContext = createContext(
  {} as { notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>> },
);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const noteArr = await getAllNotes();

      if (noteArr) setNotes(noteArr);
    };

    getNotes();
  }, []);
  const value = {
    notes,
    setNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
