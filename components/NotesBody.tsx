'use client';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { IoBulbOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

import MobileNoteNav from './MobileNoteNav';
import NoteActions from './NoteActions';
import RichTextEditor from './RichTextEditor';
import TagSelector from './TagSelector';

import { siteConfig } from '@/config/site';
import { NotesContext } from '@/contexts/NotesContext';
import { formatLastUpdated } from '@/helpers/formatLastUpdatedDate';
import { Note } from '@/types/Note';
import { apiClient } from '@/helpers/apiClient';

type NotesBodyProps = {
  className?: string;
  note?: Partial<Note>;
  onNoteChange?: (updatedNote: Partial<Note>) => void;
  readOnly?: boolean;
};

export default function NotesBody({
  className,
  note,
  onNoteChange,
  readOnly = false,
}: NotesBodyProps) {
  const { refreshNotes } = useContext(NotesContext);
  
  // Single note state instead of individual states
  const [noteState, setNoteState] = useState<Partial<Note>>({
    title: note?.title || '',
    body: note?.body || '',
    tags: note?.tags || [],
    last_updated: note?.last_updated || new Date().toISOString(),
    isArchived: note?.isArchived || false,
    _id: note?._id,
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
        _id: note._id,
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

  const handleBodyChange = (newBody: string) => {
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
    const noteToHandle = { ...noteState, _id: note._id };
    const saveNote = async () => {
      try {
        await apiClient.updateNote(noteToHandle._id!, noteToHandle);
        await refreshNotes(); // Refresh the notes list
        toast.success('Note saved successfully!');
      } catch {
        toast.error('Error saving note');
      }
    };
    const archiveNote = async () => {
      try {
        await apiClient.archiveNote(noteToHandle._id!);
        await refreshNotes(); // Refresh the notes list
        toast.success('Note archived successfully!');
      } catch {
        toast.error('Error archiving note');
      }
    };
    const restoreNote = async () => {
      try {
        await apiClient.restoreNote(noteToHandle._id!);
        await refreshNotes(); // Refresh the notes list
        toast.success('Note restored successfully!');
      } catch {
        toast.error('Error restoring note');
      }
    };
    const deleteNote = async () => {
      try {
        await apiClient.deleteNote(noteToHandle._id!);
        await refreshNotes(); // Refresh the notes list
        toast.warning('Note deleted successfully!');
      } catch {
        toast.error('Error deleting note');
      }
    };

    toReturn = (
      <div className='min-h-[calc(100vh-theme(spacing.16))]'>
        <MobileNoteNav
          isArchived={note.isArchived}
          onArchive={archiveNote}
          onDelete={deleteNote}
          onRestore={restoreNote}
          onSave={saveNote}
        />
        <div className='lg:grid lg:grid-cols-[1fr_200px]'>
          <div className='mt-4 flex flex-col gap-4 px-4'>
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
                  {note.last_updated && formatLastUpdated(
                    typeof note.last_updated === 'string' 
                      ? note.last_updated 
                      : (note.last_updated as Date).toISOString()
                  )}
                </span>
              </div>
            </div>

            {/* Rich Text Editor replaces textarea */}
            <RichTextEditor
              content={noteState.body || ''}
              readOnly={readOnly}
              onChange={handleBodyChange}
            />
          </div>
          <NoteActions
            note={{ ...noteState, _id: note._id } as Note}
            onArchive={archiveNote}
            onDelete={deleteNote}
            onRestore={restoreNote}
            onSave={saveNote}
          />
        </div>
      </div>
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

              <RichTextEditor
                content={noteState.body || ''}
                placeholder='Start writing your note here...'
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
