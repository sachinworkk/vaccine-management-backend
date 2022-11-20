/**
 * It takes a URL of an image, splits it by the "/" character, and returns the last item in the array
 * @param {string} imageUrl
 * @returns The image name without the extension.
 */
export const getImageCloudinaryId = (imageUrl: string) => {
  const imageName = imageUrl.split("/").pop();
  const assetId = (<string>imageName).split(".")[0];
  return assetId;
};
