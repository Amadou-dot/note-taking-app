import { Suspense } from 'react';

import SearchResults from '@/components/SearchResults';

export default function SearchPage() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-2xl font-bold'>Search Results</h1>
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
