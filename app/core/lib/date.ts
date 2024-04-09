/**
 * Formats a timestamptz to a date string
 * @param timestamp timestamptz string e.g. 2024-02-11 20:42:56.724089+00
 * @returns date formatted as DD mmm YYYY e.g. 01 Jan 2021
 */
export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Checks if the provided date is today.
 *
 * @param {string | Date} inputDate - The date to check, can be a string or a Date object. If a string, it should be in a format that the Date constructor can parse (e.g., "YYYY-MM-DD").
 * @returns {boolean} `true` if the input date is today according to the system's local time zone, otherwise `false`.
 */
export function isToday(inputDate: string | Date): boolean {
  const today = new Date(); // Gets today's date with the current time
  const input = new Date(inputDate); // Parses the input date

  // Checks if the year, month, and day of the input date match today's date
  return input.getDate() === today.getDate() && input.getMonth() === today.getMonth() && input.getFullYear() === today.getFullYear();
}
