import { CalendarDate, isSameDay } from '@internationalized/date';

/**
 * Formats a given date into a string with the format 'MMM DD, YYYY, HH:MM:SS AM/PM'.
 *
 * @param date - The date object to format.
 * @returns A formatted date string.
 */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

/**
 * Formats a given date string to a human-readable format.
 *
 * If the date is the same as today's date, it returns a relative time string such as:
 * - "Just now" if the difference is less than an hour.
 * - "1 hour ago" if the difference is exactly one hour.
 * - "{n} hours ago" if the difference is more than one hour.
 *
 * If the date is not the same as today's date, it returns the date formatted as "MMM DD, YYYY".
 *
 * @param dateString - The date string to format.
 * @returns A formatted string representing the relative time or the formatted date.
 */
export const formatLastUpdated = (dateString: string): string => {
  const lastUpdated = new Date(dateString);

  // Check if it's the same day
  const isSameToday = isSameDay(
    new CalendarDate(
      lastUpdated.getFullYear(),
      lastUpdated.getMonth(),
      lastUpdated.getDate(),
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
