import { RequestWithUser } from "../types/requestWIthUser";
import { VaccinePayload } from "../types/vaccine";

import { Request, Response, NextFunction } from "express";

import cloudinary from "../configs/cloudinary";

import {
  createVaccine,
  updateVaccine,
  deleteVaccine,
  getAllVaccines,
} from "../services/vaccineService";

import sharp from "sharp";
import streamifier from "streamifier";

/**
 * Get vaccines.
 * @param  {Request} req
 * @param  {Response} res
 */
export const getVaccines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allVaccines = await getAllVaccines();

    res.send({
      data: allVaccines,
    });
  } catch (error) {
    next(error);
  }
};

const uploadImageToCloudinary = async (req: Request) => {
  if (!req?.file) {
    return "";
  }

  const imageData = await sharp(req?.file?.buffer)
    .resize({
      width: 400,
      height: 400,
    })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vaccine-management/vaccines" },
      (error, result) => {
        if (error) reject(error);
        resolve(result?.secure_url || "");
      }
    );

    streamifier.createReadStream(imageData).pipe(stream);
  });
};

/**
 * Create vaccine.
 * @param  {Request} req
 * @param  {Response} res
 */
export const createVaccines = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const imageURL = await uploadImageToCloudinary(req);

  const vaccinePayload = {
    ...req.body,
    created_by: req.user.userId,
    vaccine_image_url: imageURL,
  } as VaccinePayload;

  try {
    const createdVaccine = await createVaccine(vaccinePayload);
    res.status(200);

    res.send(createdVaccine);
  } catch (error) {
    next(error);
  }
};

export const updateVaccines = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let imageURL = req.body?.vaccine_image_url || "";

  if (req.file) {
    imageURL = await uploadImageToCloudinary(req);
  }

  // @ts-ignore
  const updatedVaccinePayload = {
    ...req.body,
    updated_by: req.user.userId,
    vaccine_image_url: imageURL,
  } as VaccinePayload;

  try {
    const updatedVaccine = await updateVaccine(
      updatedVaccinePayload,
      req.params.id
    );
    res.status(200);

    res.send(updatedVaccine);
  } catch (error) {
    next(error);
  }
};

/**
 * Create vaccine.
 * @param  {Request} req
 * @param  {Response} res
 */
export const deleteVaccines = async (req: Request, res: Response) => {
  const isVaccineDeleted = await deleteVaccine(req.params.id);

  if (isVaccineDeleted) {
    res.send({ success: true });
  }
};
