import { signJWT } from "./../utils/authUtil";

import { MOCK_ACCESS_TOKEN_SIGN_AGE } from "./mockData";

export const getMockToken = () => {
  return signJWT(
    {
      userId: 1,
      name: "admin",
      email: "admin@gmail.com",
    },
    process.env.ACCESS_TOKEN_PRIVATE as string,
    MOCK_ACCESS_TOKEN_SIGN_AGE
  );
};
