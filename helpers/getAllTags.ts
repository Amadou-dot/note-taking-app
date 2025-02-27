import { notes } from '@/temp/notes';

export const getAllTags = () => {
  return new Set(notes.map((note) => note.tags).flat())
};
