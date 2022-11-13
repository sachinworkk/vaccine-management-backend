import { Request, Response, NextFunction } from "express";
import { UserSigningUp, UserLoginCredentials } from "./../domain/User";

import { createUser, signInUser } from "../services/userService";

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
    const signedInUser = await signInUser(userLoginCredentials);
    res.status(200);
    res.send(signedInUser);
  } catch (error) {
    next(error);
  }
};
