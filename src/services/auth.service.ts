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

export const login = (rememberMe: boolean = true): void => {
  const auth = {
    token:
      "dngkwigr82t78r3mg28rmg789xmg3q2mgxg9m9rmgx389mgxq28mg987.7xy23m9782n36xfg97126m6394fr67f127f96fm4x379fm44.473y789mg8cxt894m36rgxc4g239txr467fn4rxr76fn4r67r48",
    user: {
      id: "56675-g7ut3eu3h7-e3huy837e-nuy73",
      name: "Md Dilshad Alam",
      email: "mddalam1@gmail.com",
      username: "webformulator",
    },
  };
  if (rememberMe) setLocalData(authKey, JSON.stringify(auth));
  else setSessionData(authKey, JSON.stringify(auth));
};

export const logout = (): void => {
  removeLocalData(authKey);
  removeSessionData(authKey);
};
