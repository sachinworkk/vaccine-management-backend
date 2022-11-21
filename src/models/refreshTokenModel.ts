import db from "../db/db";

import { RefreshTokenData } from "../types/refreshToken";

class RefreshTokenModel {
  public static async createRefreshToken(refreshTokenData: RefreshTokenData) {
    const createdRefreshToken = await db("refresh_tokens").insert(
      refreshTokenData,
      ["token", "user_id"]
    );

    return createdRefreshToken;
  }

  public static async getRefreshToken(refreshTokenToGet: string) {
    const refreshToken = await db("refresh_tokens")
      .where({ token: refreshTokenToGet })
      .select(["id", "refresh_tokens", "user_id"])
      .first();

    return refreshToken;
  }

  public static async deleteRefreshToken(refreshTokenToDel: string) {
    const isRefreshTokenDeleted = await db("refresh_tokens")
      .where({ token: refreshTokenToDel })
      .del([]);

    return isRefreshTokenDeleted;
  }
}

export default RefreshTokenModel;
