export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
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

export interface VerifyData {
  id: string;
  code: number;
}

export interface ForgotPassword {
  email: string;
}
