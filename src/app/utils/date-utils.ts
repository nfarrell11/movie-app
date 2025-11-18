/**
 * Formats date objects for TMDB URL-based queries
 * @param date -- a Date object
 * @returns a date string in YYYY-MM-DD format
 */
export function formatDateYMD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2,'0');
  const day = date.getDate().toString().padStart(2,'0');
  return `${ year }-${ month }-${ day }`
}
/**
 *
 * @param daysBack -- the number of days to search back from today
 * @returns an object containing two formatted strings, the start date and end date
 */
export function getDateRangeFromToday(daysBack: number): {
  start: string;
  end: string;
}{
  const end = new Date();
  const start = new Date();

  start.setDate(start.getDate() - daysBack);

  return {
    start: formatDateYMD(start),
    end: formatDateYMD(end),
  };
}
