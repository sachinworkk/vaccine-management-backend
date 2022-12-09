import request from "supertest";

import app from "../app";

import UserModel from "../models/userModel";
import RefreshTokenModel from "../models/refreshTokenModel";

import * as authUtl from "../utils/authUtil";

import { getMockToken } from "./mockUtils";

import { MOCK_USER, MOCK_USERS } from "./mockData";

let token = getMockToken();

const checkIfUserExists = (email: String) => {
  return MOCK_USERS.some((user) => email === user.email);
};

const verifyPassword = (userToCheck: any) => {
  const userWithUsername: any = MOCK_USERS.find(
    (user) => userToCheck.email === user.email
  );

  return userWithUsername.password === userToCheck.password;
};

describe("user signup test", () => {
  test("user signup successfully", async () => {
    const userSigninUp = {
      name: "Test Khan",
      gender: "female",
      dateOfBirth: "1997/02/10",
      email: "test@gmail.com",
      password: "test@123",
      confirmPassword: "test@123",
      address: "USA",
    };

    const mockCreateUser = jest.fn((): any => MOCK_USER);

    const mockIfUserAlreadyExists = jest.fn((): any =>
      checkIfUserExists(userSigninUp.email)
    );

    jest
      .spyOn(UserModel, "getUserByEmail")
      .mockImplementation(() => mockIfUserAlreadyExists());

    jest
      .spyOn(UserModel, "createUser")
      .mockImplementation(() => mockCreateUser());

    const res = await request(app).post("/signup").send(userSigninUp);

    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("message");
  });

  test("user signup validation", async () => {
    const inValidUser = {
      name: "Sachin Khadka",
      gender: false,
      dateOfBirth: "asd",
      email: "admin-final@gmail.com",
      password: "sachin@test",
      confirmPassword: "sachin@test",
      address: 123,
    };

    const mockCreateUser = jest.fn((): any => inValidUser);

    jest
      .spyOn(UserModel, "createUser")
      .mockImplementation(() => mockCreateUser());

    const res = await request(app).post("/signup").send(inValidUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("type");
  });

  test("email already exists", async () => {
    const mockCreateUser = jest.fn((): any => MOCK_USER);

    const mockIfUserAlreadyExists = jest.fn((): any =>
      checkIfUserExists(MOCK_USER.email)
    );

    jest
      .spyOn(UserModel, "createUser")
      .mockImplementation(() => mockCreateUser());

    jest
      .spyOn(UserModel, "getUserByEmail")
      .mockImplementation(() => mockIfUserAlreadyExists());

    const res = await request(app).post("/signup").send(MOCK_USER);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("details");
  });
});

describe("user signIn test", () => {
  test("user signin successfully", async () => {
    const loginCredentials = {
      email: "admin-test@gmail.com",
      password: "sachin@test",
    };

    const mockRefreshToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ";

    const mockCreateRefreshToken = jest.fn((): any => mockRefreshToken);

    const mockIfUserAlreadyExists = jest.fn((): any =>
      checkIfUserExists(loginCredentials.email)
    );

    const mockPasswordVerification = jest.fn((): any =>
      verifyPassword(loginCredentials)
    );

    jest
      .spyOn(UserModel, "getUserByEmail")
      .mockImplementation(() => mockIfUserAlreadyExists());

    jest
      .spyOn(RefreshTokenModel, "createRefreshToken")
      .mockImplementation(() => mockCreateRefreshToken());

    jest
      .spyOn(authUtl, "verifyPassword")
      .mockImplementation(() => mockPasswordVerification());

    const res = await request(app).post("/signIn").send(loginCredentials);

    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body).toHaveProperty("message");
  });

  test("user signin invalid email", async () => {
    const loginCredentials = {
      email: "admins@gmail.com",
      password: "password",
    };

    const mockRefreshToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ";

    const mockCreateRefreshToken = jest.fn((): any => mockRefreshToken);

    const mockIfUserAlreadyExists = jest.fn((): any => {
      checkIfUserExists(loginCredentials.email);
    });

    jest
      .spyOn(UserModel, "getUserByEmail")
      .mockImplementation(() => mockIfUserAlreadyExists());

    jest
      .spyOn(RefreshTokenModel, "createRefreshToken")
      .mockImplementation(() => mockCreateRefreshToken());

    const res = await request(app).post("/signIn").send(loginCredentials);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("details");
  });

  test("user signin invalid password", async () => {
    const loginCredentials = {
      email: "admins@gmail.com",
      password: "password123",
    };

    const mockRefreshToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcklkIjoiMiIsImVtYWlsIjoiYWRtaW4tdGVzdEBnbWFpbC5jb20ifQ.whWPveDLjiRVRRht5IGq262YX2EQ_pcP483xSGzS5xQ";

    const mockCreateRefreshToken = jest.fn((): any => mockRefreshToken);

    jest
      .spyOn(RefreshTokenModel, "createRefreshToken")
      .mockImplementation(() => mockCreateRefreshToken());

    const res = await request(app).post("/signIn").send(loginCredentials);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("details");
  });
});

describe("user signOut test", () => {
  test("user signOut successfully", async () => {
    const mockDeleteRefreshToken = jest.fn((): any => true);

    jest
      .spyOn(RefreshTokenModel, "deleteRefreshToken")
      .mockImplementation(() => mockDeleteRefreshToken());

    const res = await request(app)
      .delete("/signout")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.body).toHaveProperty("success");
    expect(res.status).toBe(200);
  });
});
