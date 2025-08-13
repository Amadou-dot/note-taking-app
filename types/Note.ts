// MongoDB/Mongoose Note types
export interface Note {
  _id: string;
  title: string;
  body: string;
  tags: string[] | null;
  isArchived: boolean;
  created_at: string; // ISO string from MongoDB
  last_updated: string; // ISO string from MongoDB
}

export interface NoteInsert {
  title?: string;
  body?: string;
  tags?: string[] | null;
  isArchived?: boolean;
}

export interface NoteUpdate {
  _id?: string;
  title?: string;
  body?: string;
  tags?: string[] | null;
  isArchived?: boolean;
  last_updated?: string; // ISO string
}

export type ArchiveFilter = 'all' | 'archived' | 'not-archived';
