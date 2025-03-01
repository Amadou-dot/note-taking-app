import { notes } from '@/temp/notes';

export type ArchiveFilter = 'all' | 'archived' | 'not-archived';

export const getNotesBySearch = (
  query: string,
  archiveFilter: ArchiveFilter = 'all',
) => {
  // First filter by search query
  let results = notes.filter(
    ({ title, tags, body }) =>
      isIncluded(query, title) ||
      isIncluded(query, tags) ||
      isIncluded(query, body),
  );

  // Then filter by archive status
  if (archiveFilter !== 'all') {
    const isArchived = archiveFilter === 'archived';

    results = results.filter((note) => note.isArchived === isArchived);
  }

  return results;
};

const isIncluded = (value: string, target: string | string[]) => {
  if (typeof target === 'string') {
    return target.toLowerCase().includes(value.toLowerCase());
  } else if (Array.isArray(target)) {
    return target.some((v) => v.toLowerCase().includes(value.toLowerCase()));
  }

  return false;
};
