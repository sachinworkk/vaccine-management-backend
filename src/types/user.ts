export interface User {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  address: string;
  password: string;
  confirmPassword?: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

export type UserSigningUp = Omit<User, "id">;

export type UserSigningIn = Omit<User, "password">;
