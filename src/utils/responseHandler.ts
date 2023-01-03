import { Response } from "express";

export function sendHttpResponse(res: Response, statusCode: number, data: any) {
  return res.status(statusCode).json(data);
}
