import { AppError } from "./../misc/appError";
import { isValidImage } from "./../utils/fileUtil";
import { Request, Response, NextFunction } from "express";

import {
  createVaccine,
  updateVaccine,
  deleteVaccine,
  getAllVaccines,
} from "../services/vaccineService";

import { tryCatch } from "./../utils/tryCatch";

import { VaccinePayload } from "../types/vaccine";
import { RequestWithUser } from "../types/requestWIthUser";

import { STATUS_CODE, IMAGE_UPLOAD_FOLDERS } from "../constants/constants";

import { uploadImageToCloudinary } from "../utils/cloudinaryUtil";

/**
 * Get all vaccines.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getVaccines = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const allVaccines = await getAllVaccines();

    res.send({
      data: allVaccines,
    });
  }
);

/**
 * Create a vaccine.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createVaccines = tryCatch(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let imageURL = "";

    if (req.file) {
      if (!isValidImage(req.file?.mimetype)) {
        throw new AppError(400, "Invalid file type");
      }

      imageURL = (await uploadImageToCloudinary(
        req,
        IMAGE_UPLOAD_FOLDERS.VACCINE
      )) as string;
    }

    const vaccinePayload = {
      ...req.body,
      createdBy: req.user.userId,
      vaccineImageUrl: imageURL,
    } as VaccinePayload;

    const createdVaccine = await createVaccine(vaccinePayload);
    res.status(STATUS_CODE.SUCCESS);

    res.send(createdVaccine);
  }
);

/**
 * Update a vaccine.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updateVaccines = tryCatch(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let imageURL = req.body?.vaccineImageUrl || "";

    if (req.file) {
      imageURL = await uploadImageToCloudinary(req, "vaccines");
    }

    const updatedVaccinePayload = {
      ...req.body,
      updated_by: req.user.userId,
      vaccineImageUrl: imageURL,
    } as VaccinePayload;

    const updatedVaccine = await updateVaccine(
      updatedVaccinePayload,
      req.params.id
    );

    res.status(STATUS_CODE.SUCCESS).send(updatedVaccine);
  }
);

/**
 * Delete a vaccine.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deleteVaccines = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteVaccine(req.params.id);

    res.send({ success: true });
  }
);
