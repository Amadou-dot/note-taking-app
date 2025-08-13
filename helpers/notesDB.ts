import { connectDB } from '@/config/mongodb';
import NoteModel from '@/models/Note';
import { Note, NoteInsert, NoteUpdate } from '@/types/Note';

// Helper function to convert Mongoose document to Note interface
const convertToNote = (doc: any): Note => {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    body: doc.body,
    tags: doc.tags,
    isArchived: doc.isArchived,
    created_at: doc.created_at.toISOString(),
    last_updated: doc.last_updated.toISOString()
  };
};

/**
 * Retrieves a note from the database by its ID.
 *
 * @param {string} id - The ID of the note to retrieve.
 * @returns {Promise<Note[] | null>} A promise that resolves to an array of notes.
 * @throws {Error} If there is an error retrieving the note.
 */
export const getNoteById = async (id: string): Promise<Note[] | null> => {
  try {
    await connectDB();
    const note = await NoteModel.findById(id).lean();
    
    if (!note) return null;
    
    return [convertToNote(note)];
  } catch (error) {
    throw new Error(`Error retrieving note: ${error}`);
  }
};

/**
 * Retrieves all unique tags from all notes in the database.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of unique tags.
 * @throws {Error} If there is an error retrieving the tags from the database.
 */
export const getNoteTags = async (): Promise<string[]> => {
  try {
    await connectDB();
    const notes = await NoteModel.find({ tags: { $ne: null } }, 'tags').lean();
    
    const tagsArr = notes
      .filter((note) => note.tags !== null && note.tags.length > 0)
      .flatMap((note) => note.tags as string[]);

    // Return unique tags
    return Array.from(new Set(tagsArr));
  } catch (error) {
    throw new Error(`Error retrieving tags: ${error}`);
  }
};

/**
 * Retrieves all notes from the database.
 *
 * @returns {Promise<Note[] | null>} A promise that resolves to an array of notes.
 * @throws {Error} If there is an error retrieving the notes from the database.
 */
export const getAllNotes = async (): Promise<Note[] | null> => {
  try {
    await connectDB();
    const notes = await NoteModel.find({}).sort({ last_updated: -1 }).lean();
    
    return notes.map(convertToNote);
  } catch (error) {
    throw new Error(`Error retrieving notes: ${error}`);
  }
};

/**
 * Archives a note by setting its 'isArchived' field to true.
 *
 * @param {string} noteId - The ID of the note to archive.
 * @returns {Promise<Note>} A promise that resolves to the archived note.
 * @throws {Error} If there is an error archiving the note.
 */
export const handleArchiveNote = async (noteId: string): Promise<Note> => {
  try {
    await connectDB();
    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      { 
        isArchived: true,
        last_updated: new Date()
      },
      { new: true }
    ).lean();

    if (!updatedNote) {
      throw new Error('Note not found');
    }

    return convertToNote(updatedNote);
  } catch (error) {
    throw new Error(`Error archiving note: ${error}`);
  }
};

/**
 * Restores a note by setting its 'isArchived' field to false.
 *
 * @param {string} noteId - The ID of the note to restore.
 * @returns {Promise<Note | null>} A promise that resolves to the restored note.
 * @throws {Error} If there is an error restoring the note.
 */
export const handleRestoreNote = async (
  noteId: string,
): Promise<Note | null> => {
  try {
    await connectDB();
    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      { 
        isArchived: false,
        last_updated: new Date()
      },
      { new: true }
    ).lean();

    return updatedNote ? convertToNote(updatedNote) : null;
  } catch (error) {
    throw new Error(`Error restoring note: ${error}`);
  }
};

/**
 * Deletes a note from the database.
 *
 * @param {string} noteId - The ID of the note to delete.
 * @returns {Promise<Note | null>} A promise that resolves to the deleted note.
 * @throws {Error} If there is an error deleting the note.
 */
export const handleDeleteNote = async (
  noteId: string,
): Promise<Note | null> => {
  try {
    await connectDB();
    const deletedNote = await NoteModel.findByIdAndDelete(noteId).lean();

    return deletedNote ? convertToNote(deletedNote) : null;
  } catch (error) {
    throw new Error(`Error deleting note: ${error}`);
  }
};

/**
 * Saves a note to the database (updates existing note).
 *
 * @param {NoteUpdate} note - The updated note to save.
 * @returns {Promise<Note | null>} A promise that resolves to the saved note.
 * @throws {Error} If there is an error saving the note.
 */
export const handleSaveNote = async (
  note: NoteUpdate,
): Promise<Note | null> => {
  try {
    await connectDB();
    
    if (!note._id) {
      throw new Error('Note ID is required for update');
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      note._id,
      { 
        ...note, 
        last_updated: new Date() 
      },
      { new: true }
    ).lean();

    return updatedNote ? convertToNote(updatedNote) : null;
  } catch (error) {
    throw new Error(`Error saving note: ${error}`);
  }
};

/**
 * Creates a new note in the database.
 *
 * @param {NoteInsert} note - The note to create.
 * @returns {Promise<Note | null>} A promise that resolves to the created note.
 * @throws {Error} If there is an error creating the note.
 */
export const handleCreateNote = async (
  note: NoteInsert,
): Promise<Note | null> => {
  try {
    await connectDB();
    
    const newNote = new NoteModel({
      title: note.title || 'Untitled',
      body: note.body || '',
      tags: note.tags || null,
      isArchived: note.isArchived || false,
    });

    const savedNote = await newNote.save();
    
    return convertToNote(savedNote.toObject());
  } catch (error) {
    throw new Error(`Error creating note: ${error}`);
  }
};
