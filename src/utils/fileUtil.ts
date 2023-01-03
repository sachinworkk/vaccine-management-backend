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

/**
 * It takes a URL of an image, splits it by the "/" character, and returns the last item in the array
 * @param {string} imageUrl
 * @returns The image name without the extension.
 */
export const getImageId = (imageURL: string) => {
  const imageName = imageURL.split("/").pop();
  const assetId = (<string>imageName).split(".")[0];
  return assetId;
};
