export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profilePic: string;
}

export interface Auth {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface VerifyData {
  id: string;
  code: number;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  id: string;
  code: number;
  password: string;
}

export interface ForgotPassword {
  email: string;
}
