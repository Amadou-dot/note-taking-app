import { Note } from '@/types/Note';

/**
 * Extracts and flattens the tags from an array of notes.
 *
 * @param {Note[]} notes - The array of notes from which to extract tags.
 * @returns {string[]} An array of tags extracted from the notes. If the input is falsy, returns an empty array.
 */
export const getNoteTags = (notes: Note[]) => {
  if (!notes) return [];
  const tagsArr = notes.map(({ tags }) => tags).flat();

  return tagsArr;
};
