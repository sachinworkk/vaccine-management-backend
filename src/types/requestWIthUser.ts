import { Request } from "express";

export interface RequestWithUser extends Request {
  user: {
    iat: number;
    exp: number;
    userId: number;
    name: string;
    email: string;
    file?: {
      vaccineImage: "";
    };
  };
}
