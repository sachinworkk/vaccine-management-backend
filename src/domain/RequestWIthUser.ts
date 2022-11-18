import { UserPayloadDecodedFromToken } from "./UserPayloadDecodedFromToken";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user: UserPayloadDecodedFromToken;
}
