import { Request, Response, NextFunction } from "express";

import {
  createVaccine,
  updateVaccine,
  deleteVaccine,
  getAllVaccines,
} from "../services/vaccineService";

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

/**
 * Create a vaccine.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createVaccines = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const imageURL = await uploadImageToCloudinary(
    req,
    IMAGE_UPLOAD_FOLDERS.VACCINE
  );

  const vaccinePayload = {
    ...req.body,
    created_by: req.user.userId,
    vaccine_image_url: imageURL,
  } as VaccinePayload;

  try {
    const createdVaccine = await createVaccine(vaccinePayload);
    res.status(STATUS_CODE.SUCCESS);

    res.send(createdVaccine);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a vaccine.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updateVaccines = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let imageURL = req.body?.vaccine_image_url || "";

  if (req.file) {
    imageURL = await uploadImageToCloudinary(req, "vaccines");
  }

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

    res.status(STATUS_CODE.SUCCESS).send(updatedVaccine);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a vaccine.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deleteVaccines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteVaccine(req.params.id);

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};
