import { AppError } from "./../misc/appError";
import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    throw new AppError(401, "Invalid session");
  }

  return next();
}
