/**
 * Converts a value to a string.
 * - For arrays, it joins the elements into a comma-separated string.
 * - For valid non-array values, it converts them to a string.
 * - Returns null for empty or invalid values.
 *
 * @param {*} value - The value to convert.
 * @returns {string | null} The converted string or null.
 */
export const convertToString = (value) => {
  if (Array.isArray(value) && value.length > 0) {
    return value.join(', '); // Convert array to a comma-separated string if it has values
  } else if (
    value !== null &&
    value !== undefined &&
    value !== '' &&
    !Array.isArray(value)
  ) {
    return value.toString(); // Convert non-array values to a string if they exist
  }

  return null; // Return null for empty or invalid values
};
