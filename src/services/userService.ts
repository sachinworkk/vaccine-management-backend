import UserModel from "../models/UserModel";
import { UserSigningUp } from "../domain/User";

import { hashPassword } from "./../utils/authUtil";

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
