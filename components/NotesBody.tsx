'use client';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { IoBulbOutline } from 'react-icons/io5';

import MobileNoteNav from './MobileNoteNav';
import NoteActions from './NoteActions';
import TagSelector from './TagSelector';

import { siteConfig } from '@/config/site';
import { formatDate } from '@/helpers/formateDate';
import { Note } from '@/types/Note';
import { handleArchiveNote, handleDeleteNote, handleSaveNote } from '@/helpers/noteActionHandlers';

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
  // State for editable fields
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);

  // Update state when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setTags(note.tags);
    } else {
      setTitle('');
      setBody('');
      setTags([]);
    }
  }, [note]);

  // Update parent component when changes occur
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setTitle(newTitle);
    if (onNoteChange) {
      onNoteChange({ title: newTitle });
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBody = e.target.value;

    setBody(newBody);
    if (onNoteChange) {
      onNoteChange({ body: newBody });
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    if (onNoteChange) {
      onNoteChange({ tags: newTags });
    }
  };

  return (
    <>
      {note && (
        <MobileNoteNav
          isArchived={note.isArchived}
          onArchive={() => handleArchiveNote(note)}
          onDelete={() => handleDeleteNote(note.id)}
          onSave={() => handleSaveNote(note)}
        />
      )}
      <div
        className={clsx(
          'flex h-full flex-col gap-4 px-4',
          '', 
          '',
          className,
        )}
      >
        {!note && (
          <div className='flex flex-col gap-6 pt-4'>
           
            {!readOnly && (
              <>
                <input
                  className='w-full border-none bg-transparent text-4xl font-bold outline-none placeholder:text-gray-400 focus:ring-0'
                  placeholder='Note Title'
                  type='text'
                  value={title}
                  onChange={handleTitleChange}
                />

                <TagSelector
                  selectedTags={tags}
                  onTagsChange={handleTagsChange}
                />

                <textarea
                  className='h-full min-h-[50vh] w-full resize-none border-none bg-transparent outline-none placeholder:text-gray-400 focus:ring-0'
                  placeholder='Start writing your note here...'
                  value={body}
                  onChange={handleBodyChange}
                />
              </>
            )}
          </div>
        )}
        {note && (
          <div className='lg:grid lg:grid-cols-[1fr_200px] pt-24 lg:pt-4'>
            <div className='flex h-full flex-col gap-4 px-4'>
              {readOnly ? (
                <h1 className='text-4xl font-bold'>{title}</h1>
              ) : (
                <input
                  className='w-full border-none bg-transparent text-4xl font-bold outline-none focus:ring-0'
                  type='text'
                  value={title}
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
                    <span>{tags.join(', ')}</span>
                  </div>
                ) : (
                  <TagSelector
                    selectedTags={tags}
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
                <div className='flex'>
                  <p className='flex w-44 items-center gap-2'>
                    {React.createElement(siteConfig.icons.time, { size: 20 })}
                    Last edited
                  </p>
                  <span>{formatDate(note.last_updated)}</span>
                </div>
              </div>

              {readOnly ? (
                <div className='h-full overflow-y-auto whitespace-pre-wrap text-xl'>
                  {body}
                </div>
              ) : (
                <textarea
                  className='h-full min-h-[50vh] w-full resize-none border-none bg-transparent text-xl outline-none focus:ring-0'
                  value={body}
                  onChange={handleBodyChange}
                />
              )}
            </div>
            <NoteActions note={note} />
          </div>
        )}
      </div>
    </>
  );
}
