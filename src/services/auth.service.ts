import { authKey } from "../constants/constants";
import {
  Auth,
  ForgotPasswordData,
  LoginData,
  RegisterData,
  ResetPasswordData,
  VerifyData,
} from "../types/user.types";
import httpService from "./http.service";
import {
  getLocalData,
  removeLocalData,
  setLocalData,
} from "./localStorage.service";
import {
  getSessionData,
  removeSessionData,
  setSessionData,
} from "./sessionStorage.service";

export const getAuth = (): Auth => {
  const auth: string | null = getLocalData(authKey) || getSessionData(authKey);
  return auth ? JSON.parse(auth) : null;
};

export const setAuth = (data: any, rememberMe: boolean = false): void => {
  if (rememberMe) setLocalData(authKey, JSON.stringify(data));
  else setSessionData(authKey, JSON.stringify(data));
};

export const register = (data: RegisterData) => {
  return httpService.post(`/auth/register`, data);
};

export const login = (data: LoginData) => {
  return httpService.post(`/auth/login`, data);
};

export const verifyUser = (data: VerifyData) => {
  return httpService.post(`/auth/verify/${data.id}`, { code: data.code });
};

export const forgotPassword = (data: ForgotPasswordData) => {
  return httpService.post(`/auth/forgot-password`, data);
};

export const resetPassword = (data: ResetPasswordData) => {
  return httpService.post(`/auth/reset-password`, data);
};

export const logout = (): void => {
  removeLocalData(authKey);
  removeSessionData(authKey);
};
