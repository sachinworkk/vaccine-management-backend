import { AppError } from "./../misc/appError";
import { NextFunction, Request, Response } from "express";

import { verifyJWT } from "./../utils/authUtil";

/**
 * Generates new access token from refresh token and
 * adds the deserialized user to the request payload.
 *
 * @param req user Request with access token in header
 * @param res Response
 * @param next NextFunction
 * @returns next function if access token is valid and adds token data to request.
 */
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers?.authorization?.split(" ")?.[1];

    if (!accessToken) {
      throw new AppError(401, "Invalid session");
    }

    const { payload, expired } = verifyJWT(
      accessToken,
      process.env.ACCESS_TOKEN_PUBLIC as string
    );

    if (expired) {
      throw new AppError(401, "Invalid session");
    }

    // For a valid access token
    if (payload) {
      req.user = payload;

      return next();
    }
  } catch (error) {
    next(error);
  }
};
