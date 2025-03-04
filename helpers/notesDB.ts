import { supabase } from '@/config/supabase';
import { Note, NoteUpdate } from '@/types/Note';

export const getNoteById = async (id: number) => {
  const { data: notes, error } = await supabase
    .from('Notes')
    .select('*')
    .eq('id', id);

  if (error) throw new Error(error.message);

  return notes as Note[];
};

export const getNoteTags = async () => {
  const { data: tags, error } = await supabase.from('Notes').select('tags');

  if (error) throw new Error(error.message);
  if (!tags) return [];
  const tagsArr = tags.map((note: { tags: string[] }) => note.tags).flat();

  return tagsArr;
};

export const getAllNotes = async () => {
  const { data: notes, error } = await supabase.from('Notes').select('*');

  if (error) throw new Error(error.message);

  return notes as Note[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getNoteBySearch = (query: string) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleArchiveNote = (note: Note) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleDeleteNote = (noteId: number) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleSaveNote = (note: NoteUpdate) => {};
