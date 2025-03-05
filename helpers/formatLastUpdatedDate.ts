import { CalendarDate, isSameDay } from '@internationalized/date';

// Function to format last updated date
export const formatLastUpdated = (dateString: string): string => {
  const lastUpdated = new Date(dateString);

  // Check if it's the same day
  const isSameToday = isSameDay(
    new CalendarDate(
      lastUpdated.getFullYear(),
      lastUpdated.getMonth(),
      lastUpdated.getDate(), // Fixed: using getDate() instead of getDay()
    ),
    new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ),
  );

  if (isSameToday) {
    // Calculate hours difference
    const hoursDiff = Math.floor(
      (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60),
    );

    if (hoursDiff < 1) {
      return 'Just now';
    } else if (hoursDiff === 1) {
      return '1 hour ago';
    } else {
      return `${hoursDiff} hours ago`;
    }
  } else {
    // Return formatted date
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(lastUpdated);
  }
};
