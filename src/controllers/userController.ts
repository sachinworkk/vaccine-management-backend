import { Request, Response } from "express";

import { UserSigningUp, UserLoginCredentials } from "../types/user";

import { tryCatch } from "./../utils/tryCatch";

import { STATUS_CODE, MAX_COOKIE_AGE } from "../constants/constants";

import { createUser, signInUser, signOutUser } from "../services/userService";

/**
 * Sign up a new user.
 *
 * @param {Object} req
 * @param {Object} res
 */
export const signUp = tryCatch(async (req: Request, res: Response) => {
  const userSignUpData = { ...req.body } as UserSigningUp;

  const signedUpUser = await createUser(userSignUpData);

  res.status(STATUS_CODE.SUCCESS).send(signedUpUser);
});

/**
 * Sign in an existing user.
 *
 * @param {Object} req
 * @param {Object} res
 */
export const signIn = tryCatch(async (req: Request, res: Response) => {
  const userLoginCredentials = { ...req.body } as UserLoginCredentials;

  const { data, message, accessToken, refreshToken } = await signInUser(
    userLoginCredentials
  );

  res.cookie("accessToken", accessToken, {
    maxAge: MAX_COOKIE_AGE.ACCESS_TOKEN,
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: MAX_COOKIE_AGE.REFRESH_TOKEN,
    httpOnly: true,
  });

  res.status(STATUS_CODE.SUCCESS).send({ data, message });
});

/**
 * Sign out user.
 *
 * @param {Object} req
 * @param {Object} res
 */
export const signOut = tryCatch(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  await signOutUser(refreshToken);

  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(STATUS_CODE.SUCCESS).send({ success: true });
});
