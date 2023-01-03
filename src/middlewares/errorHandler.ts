import Joi from "joi";

import { Request, Response, NextFunction } from "express";

import { STATUS_CODE } from "./../constants/constants";

import { sendHttpResponse } from "../utils/responseHandler";

import { AppError } from "./../misc/appError";

export const errorHandler = (
  error: Error | Joi.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Joi.ValidationError) {
    sendHttpResponse(res, STATUS_CODE.BAD_REQUEST, {
      type: "ValidationError",
      details: error.details.map((error) => ({
        key: error.path?.[0],
        message: error.message,
      })),
    });
  }

  if (error instanceof AppError) {
    sendHttpResponse(res, error.status, {
      details: error.message,
    });
  }

  sendHttpResponse(res, STATUS_CODE.BAD_REQUEST, { details: error.message });
};
