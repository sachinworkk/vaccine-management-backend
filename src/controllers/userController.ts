import { Request, Response, NextFunction } from "express";

import { UserSigningUp, UserLoginCredentials } from "../types/user";

import { STATUS_CODE, MAX_COOKIE_AGE } from "../constants/constants";

import { createUser, signInUser, signOutUser } from "../services/userService";

/**
 * Sign up a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSignUpData = { ...req.body } as UserSigningUp;

  try {
    const signedUpUser = await createUser(userSignUpData);

    res.status(STATUS_CODE.SUCCESS).send(signedUpUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Sign in an existing user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userLoginCredentials = { ...req.body } as UserLoginCredentials;

  try {
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
  } catch (error) {
    next(error);
  }
};

/**
 * Sign out user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
