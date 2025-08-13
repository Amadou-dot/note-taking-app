import { Note, NoteInsert, NoteUpdate } from '@/types/Note';

// Client-side API helper functions
export const apiClient = {
  // Get all notes
  getAllNotes: async (): Promise<Note[]> => {
    const response = await fetch('/api/notes');
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.notes;
  },

  // Get note by ID
  getNoteById: async (id: string): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.note;
  },

  // Create new note
  createNote: async (note: NoteInsert): Promise<Note> => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.note;
  },

  // Update note
  updateNote: async (id: string, note: NoteUpdate): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.note;
  },

  // Delete note
  deleteNote: async (id: string): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.note;
  },

  // Archive note
  archiveNote: async (id: string): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}/archive`, {
      method: 'PUT',
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.note;
  },

  // Restore note
  restoreNote: async (id: string): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}/restore`, {
      method: 'PUT',
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.note;
  },

  // Get all tags
  getTags: async (): Promise<string[]> => {
    const response = await fetch('/api/tags');
    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data.tags;
  },
};
