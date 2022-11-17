import { Request, Response, NextFunction } from "express";
import { UserSigningUp, UserLoginCredentials } from "./../domain/User";

import { createUser, signInUser, signOutUser } from "../services/userService";

/**
 * Signs up the user.
 * @param  {Request} req
 * @param  {Response} res
 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSignUpData = { ...req.body } as UserSigningUp;

  try {
    const signedUpUser = await createUser(userSignUpData);
    res.status(200);
    res.send(signedUpUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Signs in the user.
 * @param  {Request} req
 * @param  {Response} res
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
      maxAge: 300000,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
    });

    res.status(200).send({ data, message });
  } catch (error) {
    next(error);
  }
};

/**
 * Signs in the user.
 * @param  {Request} req
 * @param  {Response} res
 */
export const signOut = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const isRefreshTokenDeleted = await signOutUser(refreshToken);

  if (isRefreshTokenDeleted) {
    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly: true,
    });

    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
    });

    res.send({ success: true });
  }
};
