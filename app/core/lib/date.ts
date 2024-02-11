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
