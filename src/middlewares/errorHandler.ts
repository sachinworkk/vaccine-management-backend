import Joi from "joi";

import { Request, Response, NextFunction } from "express";

import { AppError } from "./../misc/appError";

export const errorHandler = (
  error: Error | Joi.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Joi.ValidationError) {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details.map((error) => ({
        key: error.path?.[0],
        message: error.message,
      })),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({
      details: error.message,
    });
  }

  return res.status(400).json({ details: error.message });
};
