'use client';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import { IoAddOutline } from 'react-icons/io5';

import EmptyNotes from './EmptyNotes';
import NoteList from './NoteList';

import { NotesContext } from '@/contexts/NotesContext';
import { ArchiveFilter, Note } from '@/types/Note';

// Base props shared by all uses of NotesSection
type NotesSectionBaseProps = {
  className?: string;
  message?: string;
  hideButton?: boolean;
  hideEmptyNote?: boolean;
  showArchived?: boolean;
  archiveFilter?: ArchiveFilter;
};

// Props when filtering by tag
type TaggedNotesProps = NotesSectionBaseProps & {
  tag: string;
  query?: never; // Cannot have both tag and query
};

// Props when searching by query
type QueryNotesProps = NotesSectionBaseProps & {
  query: string;
  tag?: never; // Cannot have both tag and query
};

// Complete type definition - either base props, tag filtering, or query searching
type NotesSectionProps =
  | TaggedNotesProps
  | QueryNotesProps
  | NotesSectionBaseProps;

/**
 * Displays a section containing notes filtered by archived status and optional tags or search query.
 *
 * @remarks
 * The component retrieves notes from the NotesContext and filters them based on their archived status.
 * It can further filter notes by either a tag or a search query (mutually exclusive).
 * Search queries match against note title, content and tags.
 *
 * @param className - Optional additional class names for the container.
 * @param message - An optional message to be displayed in an Alert component.
 * @param hideButton - Flag to hide the "Create New Note" button when set to true.
 * @param hideEmptyNote - Flag to hide the empty state view when no notes are available.
 * @param showArchived - A boolean indicating whether to display archived notes (true) or active notes (false).
 * @param archiveFilter - An optional filter for archived status ('all', 'archived', or 'not-archived').
 *                       This takes precedence over showArchived if provided.
 * @param tag - Optional tag to filter notes by. Cannot be used with query.
 * @param query - Optional search term to filter notes by content, title or tags. Cannot be used with tag.
 *
 * @returns A JSX element representing the notes section layout.
 */
export default function NotesSection(props: NotesSectionProps) {
  const {
    className,
    message,
    hideButton,
    hideEmptyNote,
    showArchived = false,
    archiveFilter,
  } = props;

  // Safely extract tag and query with type narrowing
  const tag = 'tag' in props ? props.tag : undefined;
  const query = 'query' in props ? props.query : undefined;

  const { notes } = useContext(NotesContext);

  // Filter notes based on archive status
  let filteredNotes: Note[];

  if (archiveFilter) {
    // Use archiveFilter if provided
    filteredNotes = notes.filter((note) => {
      if (archiveFilter === 'all') return true;
      if (archiveFilter === 'archived') return note.isArchived;

      return !note.isArchived; // 'not-archived'
    });
  } else {
    // Fall back to showArchived boolean
    filteredNotes = notes.filter((note) => note.isArchived === showArchived);
  }

  // Filter by search query if provided
  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredNotes = filteredNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.body.toLowerCase().includes(lowerQuery) ||
        note.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }

  // Filter by tag if provided
  let taggedNotes: Note[] | undefined = undefined;

  if (tag) {
    taggedNotes = filteredNotes.filter((note) => note.tags?.includes(tag));
  }

  // No results check
  const hasNoResults =
    (tag && (!taggedNotes || !taggedNotes.length)) ||
    (!tag && !filteredNotes.length);

  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col border-r border-gray-300 px-4 dark:border-gray-800',
        className,
      )}
    >
      {!hideButton && (
        <Button
          as={Link}
          className='mt-4 hidden w-full lg:flex'
          color='primary'
          href='/create'
          radius='sm'
          size='lg'
          startContent={<IoAddOutline size={22} />}
        >
          Create New Note
        </Button>
      )}

      {hasNoResults && message && (
        <span className='mt-2 text-gray-500'>
          <Alert hideIcon description={message} radius='sm' variant='faded' />
        </span>
      )}

      {/* This container will scroll when the list content overflows */}
      <div className='mt-4 flex-1 overflow-y-auto scrollbar-hide'>
        {!filteredNotes.length && !taggedNotes?.length && !hideEmptyNote && (
          <EmptyNotes />
        )}
        {/* tagged notes is prioritized over filtered notes */}
        {taggedNotes && taggedNotes.length > 0 ? (
          <NoteList notes={taggedNotes} />
        ) : filteredNotes.length > 0 ? (
          <NoteList notes={filteredNotes} />
        ) : null}
      </div>
    </div>
  );
}
