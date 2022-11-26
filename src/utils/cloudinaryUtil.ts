import sharp from "sharp";
import streamifier from "streamifier";

import { Request } from "express";

import cloudinary from "../configs/cloudinary";

import { IMAGE_RES, IMAGE_UPLOAD_FOLDERS } from "../constants/constants";

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

/**
 * It uploads an image to Cloudinary, deletes the image from the local file system, and returns the URL
 * of the uploaded image
 * @param {string} fileString
 * @returns {Promise}
 */
export const uploadImageToCloudinary = async (req: Request, folder: string) => {
  const resizedImageBuffer = await sharp(req?.file?.buffer)
    .resize({
      width: IMAGE_RES.WIDTH,
      height: IMAGE_RES.HEIGHT,
    })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${IMAGE_UPLOAD_FOLDERS.ROOT}/${folder}` },
      (error, result) => {
        if (error) reject(error);
        resolve(result?.secure_url || "");
      }
    );

    streamifier.createReadStream(resizedImageBuffer).pipe(stream);
  });
};

/**
 * It takes image name, checks if it's a default image, if not, it deletes the image from cloudinary
 * @param {string} fileString
 * @returns {
 *   "result": "ok",
 *   "error": {
 *     "message": "Not Found",
 *     "http_code": 404
 *   }
 */
export const deleteImage = async (fileString: string, folder: string) => {
  try {
    const assetId = getImageCloudinaryId(fileString);
    if (assetId !== "default") {
      const publicId = `${IMAGE_UPLOAD_FOLDERS.ROOT}/${folder}/${assetId}`;

      const deleteResponse = await cloudinary.uploader.destroy(publicId);
      return deleteResponse.result;
    }
    return "ok";
  } catch {
    throw Error("Failed to delete the image");
  }
};
