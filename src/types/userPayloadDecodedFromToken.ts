export interface TokenPayload {
  iat: number;
  exp: number;
  userId: number;
  name: string;
  email: string;
}

export type UserPayloadDecodedFromToken = TokenPayload;
