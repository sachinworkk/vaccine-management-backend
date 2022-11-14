import db from "../db/db";

import { RefreshTokenData } from "./../domain/RefreshToken";

class RefreshTokenModel {
  public static async createRefreshToken(refreshTokenData: RefreshTokenData) {
    const createdRefreshToken = await db("refresh_token").insert(
      refreshTokenData,
      ["token", "user_id", "expires_at"]
    );

    return createdRefreshToken;
  }

  public static async getRefreshToken(refreshTokenToGet: string) {
    const refreshToken = await db("refresh_token")
      .where({ token: refreshTokenToGet })
      .select(["id", "refresh_token", "user_id"])
      .first();

    return refreshToken;
  }
}

export default RefreshTokenModel;
