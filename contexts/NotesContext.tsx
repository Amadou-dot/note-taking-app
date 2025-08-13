'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Note } from '@/types/Note';

export const NotesContext = createContext(
  {} as { 
    notes: Note[]; 
    setNotes: Dispatch<SetStateAction<Note[]>>;
    refreshNotes: () => Promise<void>;
  },
);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();

      if (data.notes) {
        // sort notes by last updated date
        data.notes.sort((a: Note, b: Note) => {
          return (
            new Date(b.last_updated).getTime() -
            new Date(a.last_updated).getTime()
          );
        });
        setNotes(data.notes);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching notes:', error);
    }
  };

  const refreshNotes = async () => {
    await fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  
  const value = {
    notes,
    setNotes,
    refreshNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
