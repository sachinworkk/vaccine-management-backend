import { signJWT, verifyJWT } from "./../utils/authUtil";
import { NextFunction, Request, Response } from "express";

import RefreshTokenModel from "../models/RefreshTokenModel";

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
    // @ts-ignore
    req.user = payload;

    return next();
  }

  const { payload: refresh } =
    expired && refreshToken
      ? verifyJWT(refreshToken, process.env.REFRESH_TOKEN_PUBLIC as string)
      : { payload: null };

  if (!refresh) {
    return next();
  }

  // @ts-ignore
  const session = await RefreshTokenModel.getRefreshToken(refreshToken);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(
    session,
    process.env.ACCESS_TOKEN_PRIVATE as string,
    "5s"
  );

  res.cookie("accessToken", newAccessToken, {
    maxAge: 30000,
    httpOnly: true,
  });

  // @ts-ignore
  req.user = verifyJWT(
    newAccessToken,
    process.env.ACCESS_TOKEN_PUBLIC as string
  ).payload;

  return next();
};
