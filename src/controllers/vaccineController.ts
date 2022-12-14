import { Request, Response, NextFunction } from "express";

import {
  getVaccine,
  createVaccine,
  updateVaccine,
  deleteVaccine,
  getAllVaccines,
} from "../services/vaccineService";

import { tryCatch } from "../utils/wrapperFunctions";
import { sendHttpResponse } from "../utils/responseHandler";

import { VaccinePayload } from "../types/vaccine";
import { RequestWithUser } from "../types/requestWIthUser";

import { STATUS_CODE } from "../constants/constants";

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

    sendHttpResponse(res, STATUS_CODE.SUCCESS, allVaccines);
  }
);

/**
 * Get all vaccines.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getVaccineById = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const vaccine = await getVaccine(req.params.id);

    sendHttpResponse(res, STATUS_CODE.SUCCESS, vaccine);
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
    const vaccinePayload = {
      ...req.body,
      createdBy: req.user.userId,
      file: req.file,
    } as VaccinePayload;

    const createdVaccine = await createVaccine(vaccinePayload);

    sendHttpResponse(res, STATUS_CODE.SUCCESS, createdVaccine);
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
    const updatedVaccinePayload = {
      ...req.body,
      updatedBy: req.user.userId,
      file: req.file,
    } as VaccinePayload;

    const updatedVaccine = await updateVaccine(
      updatedVaccinePayload,
      req.params.id
    );

    sendHttpResponse(res, STATUS_CODE.SUCCESS, updatedVaccine);
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
    const isVaccineDeleted = await deleteVaccine(req.params.id);

    sendHttpResponse(res, STATUS_CODE.SUCCESS, isVaccineDeleted);
  }
);
