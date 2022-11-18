import { RequestWithUser } from "./../domain/RequestWIthUser";
import { VaccinePayload } from "./../domain/Vaccine";
import { Request, Response, NextFunction } from "express";

import {
  createVaccine,
  updateVaccine,
  deleteVaccine,
} from "../services/vaccineService";

/**
 * Get vaccines.
 * @param  {Request} req
 * @param  {Response} res
 */
export const getVaccines = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200);

    // @ts-ignore
    res.send(req.user);
  } catch (error) {
    next(error);
  }
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
  // @ts-ignore
  const vaccinePayload = {
    ...req.body,
    created_by: req.user.userId,
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
  // @ts-ignore
  const updatedVaccinePayload = {
    ...req.body,
    updated_by: req.user.userId,
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
