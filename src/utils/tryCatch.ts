import { Request, Response, NextFunction } from "express";

export const tryCatch =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
