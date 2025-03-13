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

/**
 * Provides the Notes context to its children components.
 *
 * This component fetches all notes on mount, sorts them by the last updated date,
 * and provides the notes and setNotes function through the NotesContext.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the Notes context.
 *
 * @returns {JSX.Element} The NotesContext provider with the provided children.
 */
export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const noteArr = await getAllNotes();

      if (noteArr) {
        // sort notes by last updated date
        noteArr.sort((a, b) => {
          return (
            new Date(b.last_updated).getTime() -
            new Date(a.last_updated).getTime()
          );
        });
        setNotes(noteArr);
      }
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
