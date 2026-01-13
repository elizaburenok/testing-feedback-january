/**
 * Date formatting utilities for Russian locale
 */

// Russian month names in genitive case (for "25 дек")
const MONTH_NAMES_GENITIVE = [
  'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
];

/**
 * Format a date as "25 дек 2025" (Russian short format)
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  const month = MONTH_NAMES_GENITIVE[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Normalize a date to midnight (start of day) for comparison
 * @param date - Date to normalize
 * @returns New Date object set to midnight
 */
export function normalizeDate(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : date;
  const normalized = new Date(d);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Check if two dates are on the same calendar day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are on the same day
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = normalizeDate(date1);
  const d2 = normalizeDate(date2);
  return d1.getTime() === d2.getTime();
}
