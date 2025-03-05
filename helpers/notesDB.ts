import { supabase } from '@/config/supabase';
import { Note, NoteInsert, NoteUpdate } from '@/types/Note';

/**
 * Retrieves a note from the database by its ID.
 *
 * @param {number} id - The ID of the note to retrieve.
 * @returns {Promise<Note[] | null>} A promise that resolves to an array of notes.
 * @throws {Error} If there is an error retrieving the note.
 */
export const getNoteById = async (id: number): Promise<Note[] | null> => {
  const { data: notes, error } = await supabase
    .from('Notes')
    .select('*')
    .eq('id', id);

  if (error) throw new Error(error.message);

  return notes ? (notes as Note[]) : null;
};

/**
 * Retrieves all notes from the 'Notes' table in the database.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of notes.
 * @throws {Error} If there is an error retrieving the notes from the database.
 */
export const getNoteTags = async (): Promise<string[]> => {
  const { data: tags, error } = await supabase.from('Notes').select('tags');

  if (error) throw new Error(error.message);
  if (!tags) return [];
  const tagsArr = tags
    .filter((note: { tags: string[] | null }) => note.tags !== null)
    .map((note: { tags: string[] | null }) => note.tags as string[])
    .flat();

  return tagsArr;
};

/**
 * Retrieves all notes from the 'Notes' table in the database.
 *
 * @returns {Promise<Note[] | null>} A promise that resolves to an array of notes.
 * @throws {Error} If there is an error retrieving the notes from the database.
 */
export const getAllNotes = async (): Promise<Note[] | null> => {
  const { data: notes, error } = await supabase.from('Notes').select('*');

  if (error) throw new Error(error.message);

  return notes ? (notes as Note[]) : null;
};

/**
 * Archives a note by setting its 'isArchived' field to true.
 *
 * @param {number} noteId - The ID of the note to archive.
 * @returns {Promise<Note>} A promise that resolves to the archived note.
 * @throws {Error} If there is an error archiving the note.
 */
export const handleArchiveNote = async (noteId: number): Promise<Note> => {
  const { data, error } = await supabase
    .from('Notes')
    .update({ isArchived: true })
    .eq('id', noteId)
    .select();

  if (error) throw new Error(error.message);

  return data ? data[0] : data;
};

/**
 * Restores a note by setting its 'isArchived' field to false.
 *
 * @param {number} noteId - The ID of the note to restore.
 * @returns {Promise<Note>} A promise that resolves to the restored note.
 * @throws {Error} If there is an error restoring the note.
 */
export const handleRestoreNote = async (
  noteId: number,
): Promise<Note | null> => {
  const { data, error } = await supabase
    .from('Notes')
    .update({ isArchived: false })
    .eq('id', noteId)
    .select();

  if (error) throw new Error(error.message);

  return data ? data[0] : data;
};

/**
 * Deletes a note from the database.
 *
 * @param {number} noteId - The ID of the note to delete.
 * @returns {Promise<Note | null>} A promise that resolves to the deleted note.
 * @throws {Error} If there is an error deleting the note.
 */
export const handleDeleteNote = async (
  noteId: number,
): Promise<Note | null> => {
  let { data, error } = await supabase
    .from('Notes')
    .delete()
    .eq('id', noteId)
    .select();

  if (error) throw new Error(error.message);

  return data ? data[0] : data;
};

/**
 * Saves a note to the database.
 *
 * @param {NoteUpdate} note - The updated note to save.
 * @returns {Promise<Note | null>} A promise that resolves to the saved note.
 * @throws {Error} If there is an error saving the note.
 */
export const handleSaveNote = async (
  note: NoteUpdate,
): Promise<Note | null> => {
  const { data, error } = await supabase
    .from('Notes')
    .upsert({ ...note })
    .select();

  if (error) throw new Error(error.message);

  return data ? data[0] : data;
};

/**
 * Creates a new note in the database.
 *
 * @param {Note} note - The note to create.
 * @returns {Promise<Note | null>} A promise that resolves to the created note.
 * @throws {Error} If there is an error creating the note.
 */
export const handleCreateNote = async (
  note: NoteInsert,
): Promise<Note | null> => {
  const { data, error } = await supabase.from('Notes').insert([note]).select();

  if (error) throw new Error(error.message);

  return data ? data[0] : data;
};
