// User interface
export interface RefreshToken {
  id: number;
  token: string;
  user_id: number;
}

// User data when creating the user (no id column)
export type RefreshTokenData = Omit<RefreshToken, "id">;
