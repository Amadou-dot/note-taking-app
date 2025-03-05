'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { IoBulbOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

import MobileNoteNav from './MobileNoteNav';
import NoteActions from './NoteActions';
import TagSelector from './TagSelector';

import { siteConfig } from '@/config/site';
import { formatLastUpdated } from '@/helpers/formatLastUpdatedDate';
import {
  handleArchiveNote,
  handleDeleteNote,
  handleRestoreNote,
  handleSaveNote,
} from '@/helpers/notesDB';
import { Note } from '@/types/Note';

type NotesBodyProps = {
  className?: string;
  note?: Note;
  onNoteChange?: (updatedNote: Partial<Note>) => void;
  readOnly?: boolean;
};

export default function NotesBody({
  className,
  note,
  onNoteChange,
  readOnly = false,
}: NotesBodyProps) {
  // Single note state instead of individual states
  const [noteState, setNoteState] = useState<Partial<Note>>({
    title: note?.title || '',
    body: note?.body || '',
    tags: note?.tags || [],
    last_updated: note?.last_updated || new Date().toISOString(),
    isArchived: note?.isArchived || false,
    id: note?.id,
  });

  // Update state when note changes
  useEffect(() => {
    if (note) {
      setNoteState({
        title: note.title,
        body: note.body,
        tags: note.tags || [],
        last_updated: note.last_updated,
        isArchived: note.isArchived,
        id: note.id,
      });
    } else {
      setNoteState({
        title: '',
        body: '',
        tags: [],
        last_updated: new Date().toISOString(),
        isArchived: false,
      });
    }
  }, [note]);

  // Update parent component when changes occur
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setNoteState((prev) => ({
      ...prev,
      title: newTitle,
    }));

    if (onNoteChange) {
      onNoteChange({ title: newTitle });
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBody = e.target.value;

    setNoteState((prev) => ({
      ...prev,
      body: newBody,
    }));

    if (onNoteChange) {
      onNoteChange({ body: newBody });
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setNoteState((prev) => ({
      ...prev,
      tags: newTags,
    }));

    if (onNoteChange) {
      onNoteChange({ tags: newTags });
    }
  };

  let toReturn: React.ReactNode = null;

  if (note) {
    const noteToHandle = { ...noteState, id: note.id };
    const saveNote = async () => {
      try {
        await handleSaveNote(noteToHandle);
        toast.success('Note saved successfully!');
      } catch {
        toast.error('Error saving note');
      }
    };
    const archiveNote = async () => {
      try {
        await handleArchiveNote(noteToHandle.id);
        toast.success('Note archived successfully!');
      } catch {
        toast.error('Error archiving note');
      }
    };
    const restoreNote = async () => {
      try {
        await handleRestoreNote(noteToHandle.id);
        toast.success('Note restored successfully!');
      } catch {
        toast.error('Error restoring note');
      }
    };
    const deleteNote = async () => {
      try {
        await handleDeleteNote(noteToHandle.id);
        toast.warning('Note deleted successfully!');
      } catch {
        toast.error('Error deleting note');
      }
    };

    toReturn = (
      <>
        <MobileNoteNav
          isArchived={note.isArchived}
          onArchive={archiveNote}
          onDelete={deleteNote}
          onRestore={restoreNote}
          onSave={saveNote}
        />
        <div className='pt-4 lg:grid lg:grid-cols-[1fr_200px]'>
          <div className='flex h-full flex-col gap-4 px-4'>
            {readOnly ? (
              <h1 className='text-4xl font-bold'>{noteState.title}</h1>
            ) : (
              <input
                className='w-full border-none bg-transparent text-4xl font-bold outline-none focus:ring-0'
                type='text'
                value={noteState.title}
                onChange={handleTitleChange}
              />
            )}

            {/* Tags */}
            <div className='space-y-4 border-b pb-2 dark:border-gray-800'>
              {readOnly ? (
                <div className='flex'>
                  <p className='flex w-44 items-center gap-2'>
                    {React.createElement(siteConfig.icons.tag, { size: 20 })}
                    Tags
                  </p>
                  <span>{(noteState.tags || []).join(', ')}</span>
                </div>
              ) : (
                <TagSelector
                  selectedTags={noteState.tags || []}
                  onTagsChange={handleTagsChange}
                />
              )}

              {/* Archive status */}
              {note.isArchived && (
                <div className='flex'>
                  <p className='flex w-44 items-center gap-2'>
                    {React.createElement(IoBulbOutline, { size: 20 })}
                    Status
                  </p>
                  <span>Archived</span>
                </div>
              )}

              {/* Last edited */}
              <div className='flex justify-between'>
                <p className='flex w-44 items-center gap-2'>
                  {React.createElement(siteConfig.icons.time, { size: 20 })}
                  Last edited
                </p>
                <span>
                  {note.last_updated && formatLastUpdated(note.last_updated)}
                </span>
              </div>
            </div>

            {readOnly ? (
              <div className='h-full overflow-y-auto whitespace-pre-wrap text-xl'>
                {noteState.body}
              </div>
            ) : (
              <textarea
                className='h-full min-h-[50vh] w-full resize-none border-none bg-transparent text-xl outline-none focus:ring-0'
                value={noteState.body}
                onChange={handleBodyChange}
              />
            )}
          </div>
          <NoteActions
            note={{ ...noteState, id: note.id } as Note}
            onArchive={archiveNote}
            onDelete={deleteNote}
            onRestore={restoreNote}
            onSave={saveNote}
          />
        </div>
      </>
    );
  } else {
    toReturn = (
      <div className={clsx('flex h-full flex-col gap-4 px-4', className)}>
        <div className='flex flex-col gap-6 pt-4'>
          {!readOnly && (
            <>
              <input
                className='w-full border-none bg-transparent text-4xl font-bold outline-none placeholder:text-gray-400 focus:ring-0'
                placeholder='Note Title'
                type='text'
                value={noteState.title}
                onChange={handleTitleChange}
              />

              <TagSelector
                selectedTags={noteState.tags || []}
                onTagsChange={handleTagsChange}
              />

              <textarea
                className='h-full min-h-[50vh] w-full resize-none border-none bg-transparent outline-none placeholder:text-gray-400 focus:ring-0'
                placeholder='Start writing your note here...'
                value={noteState.body}
                onChange={handleBodyChange}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  return toReturn;
}
