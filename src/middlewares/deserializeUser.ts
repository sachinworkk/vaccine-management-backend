import { NextFunction, Request, Response } from "express";

import RefreshTokenModel from "../models/refreshTokenModel";

import { signJWT, verifyJWT } from "./../utils/authUtil";

import { JWT_SIGN_AGE, MAX_COOKIE_AGE } from "./../constants/constants";

import { UserPayloadDecodedFromToken } from "../types/userPayloadDecodedFromToken";

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
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(
    accessToken,
    process.env.ACCESS_TOKEN_PUBLIC as string
  );

  // For a valid access token
  if (payload) {
    req.user = payload;

    return next();
  }

  const session = await RefreshTokenModel.getRefreshToken(refreshToken);

  if (!session) {
    return next();
  }

  const { payload: refreshTokenDecodedPayload } =
    expired && refreshToken
      ? verifyJWT(refreshToken, process.env.REFRESH_TOKEN_PUBLIC as string)
      : { payload: null };

  if (!refreshTokenDecodedPayload) {
    return next();
  }

  const { iat, exp, ...userPayload } =
    refreshTokenDecodedPayload as UserPayloadDecodedFromToken;

  const newAccessToken = signJWT(
    userPayload,
    process.env.ACCESS_TOKEN_PRIVATE as string,
    JWT_SIGN_AGE.ACCESS_TOKEN
  );

  res.cookie("accessToken", newAccessToken, {
    maxAge: MAX_COOKIE_AGE.ACCESS_TOKEN,
    httpOnly: true,
  });

  req.user = verifyJWT(
    newAccessToken,
    process.env.ACCESS_TOKEN_PUBLIC as string
  )?.payload;

  return next();
};
