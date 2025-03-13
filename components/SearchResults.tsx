'use client';
import { Radio, RadioGroup } from '@heroui/radio';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import NotesSection from './NotesSection';
import SearchBar from './SearchBar';

import { ArchiveFilter } from '@/types/Note';

/**
 * The `SearchResults` component is responsible for rendering the search results
 * based on the query parameter from the URL and the selected archive filter.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered search results component.
 *
 * @remarks
 * This component uses the `useSearchParams` hook to retrieve the query parameter
 * from the URL and updates the search input value accordingly. It also provides
 * a radio group to filter notes based on their archive status.
 *
 * @example
 * ```tsx
 * <SearchResults />
 * ```
 *
 * @hook
 * - `useSearchParams` - Retrieves the search parameters from the URL.
 * - `useState` - Manages the state for the search input value and archive filter.
 * - `useEffect` - Updates the search input value when the URL parameter changes.
 *
 * @param {string} queryParam - The query parameter from the URL.
 * @param {string} value - The current value of the search input.
 * @param {ArchiveFilter} archiveFilter - The current archive filter selection.
 *
 * @interface ArchiveFilter
 * @property {string} 'all' - Filter to show all notes.
 * @property {string} 'not-archived' - Filter to show only not archived notes.
 * @property {string} 'archived' - Filter to show only archived notes.
 */
export default function SearchResults(): JSX.Element {
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
