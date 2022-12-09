/**
 * Checks if is valid image.
 *
 * @param {string} mimeType
 * @returns Boolean
 */
export const isValidImage = (mimeType: string) => {
  if (
    mimeType === "image/jpeg" ||
    mimeType === "image/png" ||
    mimeType === "image/gif"
  ) {
    return true;
  }

  return false;
};
