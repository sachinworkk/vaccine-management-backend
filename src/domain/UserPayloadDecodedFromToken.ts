// User interface
export interface TokenPayload {
  iat: number;
  exp: number;
  userId: number;
  name: string;
  email: string;
}

// User data when creating the user (no id column)
export type UserPayloadDecodedFromToken = Omit<TokenPayload, "iat" | "exp">;
