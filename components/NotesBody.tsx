'use client';
import clsx from 'clsx';
import React from 'react';
import { IoBulbOutline } from 'react-icons/io5';

import MobileNoteNav from './MobileNoteNav';
import NoteActions from './NoteActions';

import { siteConfig } from '@/config/site';
import { formatDate } from '@/helpers/formateDate';
import { Note } from '@/types/Note';

type NotesBodyProps = {
  className?: string;
  note?: Note;
};

export default function NotesBody({ className, note }: NotesBodyProps) {
  // Mock handlers - these should be implemented with actual functionality
  const handleSave = () => console.log('save');
  const handleDelete = () => console.log('delete');
  const handleArchive = () => console.log('archive');

  return (
    <>
      {note && (
        <MobileNoteNav
          isArchived={note.isArchived}
          onArchive={handleArchive}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      )}
      <div
        className={clsx(
          'flex h-full flex-col gap-4 px-4',
          'pt-20 lg:pt-4', // Add top padding for mobile nav
          className,
        )}
      >
        {!note && (
          <p className='mt-4 text-lg font-semibold'>
            Open a note or Create a new one to get started
          </p>
        )}
        {note && (
          <div className='lg:grid lg:grid-cols-[1fr_200px]'>
            <div className='flex h-full flex-col gap-4 px-4'>
              <h1 className='text-4xl font-bold'>{note.title}</h1>

              {/* Tags */}
              <div className='space-y-2 border-b pb-2 dark:border-gray-800'>
                <div className='flex'>
                  <p className='flex w-44 items-center gap-2'>
                    {React.createElement(siteConfig.icons.tag, { size: 20 })}
                    Tags
                  </p>
                  <span>{note.tags.join(',')}</span>
                </div>
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

              <div className='h-full overflow-y-auto whitespace-pre-wrap text-xl'>
                {note.body}
              </div>
            </div>
            <NoteActions note={note} />
          </div>
        )}
      </div>
    </>
  );
}
