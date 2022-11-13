import { UserSigningUp } from "./../domain/User";
import { Request, Response, NextFunction } from "express";

import { createUser } from "../services/userService";

/**
 * Signs up the user.
 * @param  {Request} req
 * @param  {Response} res
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = { ...req.body } as UserSigningUp;

  try {
    const result = await createUser(userData);
    res.status(200);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
