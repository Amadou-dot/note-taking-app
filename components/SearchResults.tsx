'use client';
import { Radio, RadioGroup } from '@heroui/radio';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import NotesSection from './NotesSection';
import SearchBar from './SearchBar';

import { ArchiveFilter } from '@/types/Note';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get('q') || '';

  const [value, setValue] = useState(queryParam);
  const [archiveFilter, setArchiveFilter] =
    useState<ArchiveFilter>('not-archived');

  useEffect(() => {
    // Update value when URL parameter changes
    setValue(queryParam);
  }, [queryParam]);

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
          archiveFilter={archiveFilter}
          className='max-h-screen overflow-y-scroll border-none'
          query={value}
        />
      )}
    </div>
  );
}
