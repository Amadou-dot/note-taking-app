import { Note } from '@/types/Note';

export const handleArchiveNote = (note: Note) => {
  // eslint-disable-next-line no-console
  console.log('Archive: ', note);
};

export const handleDeleteNote = (noteId: number) => {
  // eslint-disable-next-line no-console
  console.log('Delete:', noteId);
};

export const handleSaveNote = (note: Partial<Note>) => {
  // eslint-disable-next-line no-console
  console.log('Add: ', note);
};
