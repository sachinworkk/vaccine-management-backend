import { AppError } from "./../misc/appError";
import { NextFunction, Request, Response } from "express";

import RefreshTokenModel from "../models/refreshTokenModel";

import { tryCatch } from "./../utils/tryCatch";
import { verifyJWT, signJWT } from "./../utils/authUtil";

import { UserPayloadDecodedFromToken } from "./../types/userPayloadDecodedFromToken";

import { STATUS_CODE, JWT_SIGN_AGE } from "./../constants/constants";

/**
 * Refresh token.
 *
 * @param {Object} req
 * @param {Object} res
 */
export const refreshToken = tryCatch(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const session = await RefreshTokenModel.getRefreshToken(refreshToken);

  if (!session) {
    throw new AppError(401, "Invalid refresh token");
  }

  const { payload: refreshTokenDecodedPayload } = verifyJWT(
    refreshToken,
    process.env.REFRESH_TOKEN_PUBLIC as string
  );

  if (!refreshTokenDecodedPayload) {
    throw new AppError(401, "Invalid refresh token");
  }

  const { iat, exp, ...userPayload } =
    refreshTokenDecodedPayload as UserPayloadDecodedFromToken;

  const newAccessToken = signJWT(
    userPayload,
    process.env.ACCESS_TOKEN_PRIVATE as string,
    JWT_SIGN_AGE.ACCESS_TOKEN
  );

  res.status(STATUS_CODE.SUCCESS).send({
    accessToken: newAccessToken,
  });
});
