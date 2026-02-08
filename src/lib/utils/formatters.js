/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale (default: en-US)
 * @returns {string} Formatted date
 */
export function formatDate(date, locale = "en-US") {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: "...")
 * @returns {string} Truncated text
 */
export function truncateText(text, length, suffix = "...") {
  if (text.length <= length) return text;
  return text.substring(0, length) + suffix;
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}



