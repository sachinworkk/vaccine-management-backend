import sharp from "sharp";
import streamifier from "streamifier";

import { getImageId } from "../utils/fileUtil";

import cloudinary from "../configs/cloudinary";

import { AppError } from "../misc/appError";

import { STATUS_CODE } from "../constants/constants";

import { IMAGE_RES, IMAGE_UPLOAD_FOLDERS } from "../constants/constants";

export class FileHandlerService {
  public static async uploadFile(file: Buffer, folder: string) {
    const resizedImageBuffer = await sharp(file)
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
  }

  public static async deleteFile(imageURL: string, folder: string) {
    try {
      const assetId = getImageId(imageURL);
      if (assetId) {
        const publicId = `${IMAGE_UPLOAD_FOLDERS.ROOT}/${folder}/${assetId}`;

        const deleteResponse = await cloudinary.uploader.destroy(publicId);
        return deleteResponse.result;
      }
    } catch {
      throw new AppError(
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Failed to delete the image"
      );
    }
  }
}
