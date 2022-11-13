import UserModel from "../models/UserModel";
import { UserSigningUp, UserLoginCredentials } from "../domain/User";

import { hashPassword, verifyPassword } from "./../utils/authUtil";

export const createUser = async (userData: UserSigningUp) => {
  const hashedPassword = await hashPassword(userData.password);

  const insertedData = await UserModel.createUser({
    ...userData,
    password: hashedPassword,
  });

  return {
    data: insertedData,
    message: "User created successfully",
  };
};

export const signInUser = async (userCredentials: UserLoginCredentials) => {
  const retrievedUser = await UserModel.getUserByEmail(userCredentials.email);

  const passwordVerification = await verifyPassword(
    userCredentials.password,
    retrievedUser.password
  );

  if (!passwordVerification) throw new Error("Password does not match");

  return {
    data: {
      ...retrievedUser,
    },
    message: "User logged in successfully",
  };
};
