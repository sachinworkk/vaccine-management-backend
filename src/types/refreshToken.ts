export interface RefreshToken {
  id: number;
  token: string;
  userId: number;
}

export type RefreshTokenData = Omit<RefreshToken, "id">;
