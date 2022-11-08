import { createContext } from "react";
import { getAuth } from "../services/auth.service";
import { AuthContextProps } from "../types/props.types";
import { Auth } from "../types/user.types";

export const AuthContext = createContext<Auth | null>(null);
const auth: Auth | null = getAuth();

const AuthContextProvider = (props: AuthContextProps) => {
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
