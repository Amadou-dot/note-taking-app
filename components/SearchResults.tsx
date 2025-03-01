'use client';
import { Radio, RadioGroup } from '@heroui/radio';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import NotesSection from './NotesSection';
import SearchBar from './SearchBar';

import { ArchiveFilter, getNotesBySearch } from '@/helpers/getNotesBySearch';
import { Note } from '@/types/Note';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get('q') || '';

  const [value, setValue] = useState(queryParam);
  const [notes, setNotes] = useState<Note[]>([]);
  const [archiveFilter, setArchiveFilter] =
    useState<ArchiveFilter>('not-archived');

  useEffect(() => {
    // Update value when URL parameter changes
    setValue(queryParam);
  }, [queryParam]);

  useEffect(() => {
    // Search for notes when value or archiveFilter changes
    if (value) {
      const searchResults = getNotesBySearch(value, archiveFilter);

      setNotes(searchResults);
    } else {
      setNotes([]);
    }
  }, [value, archiveFilter]);

  return (
    <div>
      <SearchBar
        className='w-full lg:hidden'
        value={value}
        onValueChange={setValue}
      />

      <div className='my-4'>
        <RadioGroup
          label='Filter notes'
          orientation='horizontal'
          value={archiveFilter}
          onValueChange={(val: string) =>
            setArchiveFilter(val as ArchiveFilter)
          }
        >
          <Radio value='all'>All Notes</Radio>
          <Radio value='not-archived'>Not Archived</Radio>
          <Radio value='archived'>Archived</Radio>
        </RadioGroup>
      </div>

      {value && (
        <NotesSection
          hideButton
          hideEmptyNote
          className='border-none'
          message={(!notes.length && 'No notes contain that term') || undefined}
          notes={notes}
        />
      )}
    </div>
  );
}
