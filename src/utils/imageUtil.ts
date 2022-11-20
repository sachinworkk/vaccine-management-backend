import { getImageCloudinaryId } from "./fileUtil";
import cloudinary from "../handlers/cloudinary";

import fs from "fs";

/**
 * It uploads an image to Cloudinary, deletes the image from the local file system, and returns the URL
 * of the uploaded image
 * @param {string} fileString
 * @returns url of the uploaded image
 */
export const uploadImage = async (fileString: string, folder: string) => {
  try {
    if (!fs.existsSync(fileString)) {
      throw new Error("File not found!");
    }
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      folder: "vaccine-management" + "/" + folder,
    });

    fs.unlinkSync(fileString);

    return uploadResponse.secure_url;
  } catch (error) {
    fs.unlinkSync(fileString);
    throw Error("Failed to upload to cloud");
  }
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
      const publicId =
        "vaccine-management" +
        "/" +
        folder +
        "/" +
        getImageCloudinaryId(fileString);
      const deleteResponse = await cloudinary.uploader.destroy(publicId);
      return deleteResponse.result;
    }
    return "ok";
  } catch {
    throw Error("Failed to delete the image");
  }
};

export default uploadImage;
