import { authKey } from "../constants/constants";
import { Auth } from "../types/user.types";
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

export const login = (data: any, rememberMe: boolean = false): void => {
  if (rememberMe) setLocalData(authKey, JSON.stringify(data));
  else setSessionData(authKey, JSON.stringify(data));
};

export const logout = (): void => {
  removeLocalData(authKey);
  removeSessionData(authKey);
};
