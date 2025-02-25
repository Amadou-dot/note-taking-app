type Props = {
  params: Promise<{ noteId: string }>;
};
import React from 'react';

import { siteConfig } from '@/config/site';
import { formatDate } from '@/helpers/formateDate';
import { notes } from '@/temp/notes';
export default async function page({ params }: Props) {
  const p = await params;
  const id = p.noteId;
  const note = notes[notes.findIndex((note) => note.id === Number(id))];

  if (!note) return <div>That note does not exist</div>;
  const updated = formatDate(note.last_updated);
  // const created = formatDate(note.created_at);

  return (
    <div className='flex flex-col gap-4 px-4'>
      <h1 className='text-4xl font-bold'>{note.title}</h1>
      {/* Note info */}
      <div className='space-y-2'>
        <div className='flex'>
          <p className='flex w-44 items-center gap-2'>
            {React.createElement(siteConfig.icons.tag, { size: 20 })} Tags
          </p>
          <span>{note.tags.join(',')}</span>
        </div>
        <div className='flex'>
          <p className='flex w-44 items-center gap-2'>
            {React.createElement(siteConfig.icons.time, { size: 20 })} Last
            edited
          </p>
          <span>{updated}</span>
        </div>
      </div>
      <hr />
      <div className='whitespace-pre-wrap text-xl'>{note.body}</div>
    </div>
  );
}
