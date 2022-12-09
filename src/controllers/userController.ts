import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

import { UserSigningUp, UserLoginCredentials } from "../types/user";

import { tryCatch } from "./../utils/tryCatch";

import { STATUS_CODE } from "../constants/constants";

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

  const { user, message, accessToken, refreshToken } = await signInUser(
    userLoginCredentials
  );

  res
    .status(STATUS_CODE.SUCCESS)
    .send({ user, accessToken, refreshToken, message });
});

/**
 * Sign out user.
 *
 * @param {Object} req
 * @param {Object} res
 */
export const signOut = tryCatch(async (req: Request, res: Response) => {
  await signOutUser(req.user as JwtPayload);

  res.status(STATUS_CODE.SUCCESS).send({ success: true });
});
