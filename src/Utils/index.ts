/**
 * Truncates a given text to a specified maximum length and appends an ellipsis if necessary.
 *
 * @param {string} text - The text to be sliced.
 * @param {number} [maxlength=50] - The maximum length of the text before it is truncated.
 * @returns {string} The sliced text with an ellipsis if it exceeds the maximum length.
 */
export function textSlicer(text: string, maxlength: number = 50) {
  if (text.length >= maxlength) return text.slice(0, maxlength) + "...";
  return text;
}
