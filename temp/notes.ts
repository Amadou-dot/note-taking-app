import { Note } from '@/types/Note';

export const notes: Note[] = [
  {
    id: 1,
    title: 'React Performance Optimization',
    body: `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2.	Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`,
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Travel', 'Personal'],
  },
  {
    id: 2,
    title: 'Team Meeting',
    body: 'Discuss project roadmap',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Work'],
  },
  {
    id: 3,
    title: 'Grocery List',
    body: 'Buy vegetables and fruits',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal'],
  },
  {
    id: 4,
    title: 'Workout Routine',
    body: 'Leg day exercises',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Health'],
  },
  {
    id: 5,
    title: 'Project Ideas',
    body: 'Brainstorm potential projects',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Work', 'Ideas'],
  },
  {
    id: 6,
    title: 'Book List',
    body: 'Books to read this year',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Reading'],
  },
  {
    id: 7,
    title: 'Pasta Recipe',
    body: 'Ingredients and steps to make pasta',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Cooking'],
  },
  {
    id: 8,
    title: 'Travel Bucket List',
    body: 'Places to visit around the world',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Travel'],
  },
  {
    id: 9,
    title: 'Daily Journal',
    body: 'Thoughts and reflections',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Journal'],
  },
  {
    id: 10,
    title: 'Tech Conference Notes',
    body: 'Insights from the latest tech event',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Work', 'Tech'],
  },
  {
    id: 11,
    title: 'Budget Planning',
    body: 'Plan monthly expenses and savings',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Finance'],
  },
  {
    id: 12,
    title: 'Home Renovation',
    body: 'Ideas for improving the house',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Home'],
  },
  {
    id: 13,
    title: 'Meditation Schedule',
    body: 'Daily meditation timings',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Health'],
  },
  {
    id: 14,
    title: 'Learning Goals',
    body: 'Courses and tutorials to follow',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Learning'],
  },
  {
    id: 15,
    title: 'Upcoming Workshops',
    body: 'Dates and details of workshops',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Work', 'Learning'],
  },
  {
    id: 16,
    title: 'Event Planning',
    body: 'Organizing birthday party',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Event'],
  },
  {
    id: 17,
    title: 'Coding Challenges',
    body: 'Daily algorithm and coding problems',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Work', 'Coding'],
  },
  {
    id: 18,
    title: 'Movie Watchlist',
    body: 'List of movies to watch',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Entertainment'],
  },
  {
    id: 19,
    title: 'Meeting Follow-up',
    body: 'Action items from last meeting',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Work'],
    isArchived: true,
  },
  {
    id: 20,
    title: 'Gardening Tips',
    body: 'Ideas for maintaining the garden',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Hobby'],
    isArchived: true,
  },
  {
    id: 21,
    title: 'Language Practice',
    body: 'Daily Spanish practice schedule',
    created_at: new Date(),
    last_updated: new Date(),
    tags: ['Personal', 'Learning'],
    isArchived: true,
  },
];
