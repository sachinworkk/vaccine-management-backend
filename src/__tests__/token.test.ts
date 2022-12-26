import request from "supertest";

import app from "../app";

import RefreshTokenModel from "../models/refreshTokenModel";

import { getMockToken } from "./mockUtils";

import * as authUtl from "../utils/authUtil";

import { MOCK_USER_TOKEN_PAYLOAD } from "./mockData";

let token = getMockToken();

describe("user refresh token", () => {
  test("user refresh token successfully", async () => {
    const mockSession = jest.fn(
      (): any =>
        "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ"
    );

    const mockVerifyJWTToken = jest.fn((): any => MOCK_USER_TOKEN_PAYLOAD);

    const mockGenerateAccessToken = jest.fn((): any => ({
      payload: token,
      expired: false,
    }));

    jest
      .spyOn(RefreshTokenModel, "getRefreshToken")
      .mockImplementation(() => mockSession());

    jest
      .spyOn(authUtl, "verifyJWT")
      .mockImplementation(() => mockVerifyJWTToken());

    jest
      .spyOn(authUtl, "signJWT")
      .mockImplementation(() => mockGenerateAccessToken());

    const res = await request(app)
      .post("/token/refresh")
      .set("Authorization", `Bearer ${token}`)
      .send({
        refreshToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ",
      });

    expect(res.body).toHaveProperty("accessToken");
    expect(res.status).toBe(200);
  });

  test("user refresh token error", async () => {
    const mockSession = jest.fn((): any => undefined);

    const mockVerifyJWTToken = jest.fn((): any => MOCK_USER_TOKEN_PAYLOAD);

    const mockGenerateAccessToken = jest.fn((): any => ({
      payload: token,
      expired: false,
    }));

    jest
      .spyOn(RefreshTokenModel, "getRefreshToken")
      .mockImplementation(() => mockSession());

    jest
      .spyOn(authUtl, "verifyJWT")
      .mockImplementation(() => mockVerifyJWTToken());

    jest
      .spyOn(authUtl, "signJWT")
      .mockImplementation(() => mockGenerateAccessToken());

    const res = await request(app)
      .post("/token/refresh")
      .set("Authorization", `Bearer ${token}`)
      .send({
        refreshToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ",
      });

    expect(res.body).toMatchObject({ details: "Invalid refresh token" });
    expect(res.status).toBe(401);
  });

  test("user refresh token cannot be decoded", async () => {
    const mockSession = jest.fn(
      (): any =>
        "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ"
    );

    const mockVerifyJWTToken = jest.fn((): any => "undefined");

    const mockGenerateAccessToken = jest.fn((): any => ({
      payload: token,
      expired: false,
    }));

    jest
      .spyOn(RefreshTokenModel, "getRefreshToken")
      .mockImplementation(() => mockSession());

    jest
      .spyOn(authUtl, "verifyJWT")
      .mockImplementation(() => mockVerifyJWTToken());

    jest
      .spyOn(authUtl, "signJWT")
      .mockImplementation(() => mockGenerateAccessToken());

    const res = await request(app)
      .post("/token/refresh")
      .set("Authorization", `Bearer ${token}`)
      .send({
        refreshToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ",
      });

    expect(res.body).toMatchObject({
      details: "Refresh token cannot be decoded",
    });
    expect(res.status).toBe(401);
  });
});
