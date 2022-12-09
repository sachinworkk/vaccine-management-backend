import { Request, Response, NextFunction } from "express";

/**
 * It wraps an async function in try catch.
 * @param {Function}  controller
 */
export const tryCatch =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
