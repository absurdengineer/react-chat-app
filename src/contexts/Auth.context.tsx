import { createContext, useReducer } from "react";
import { getAuth, setAuth, logout } from "../services/auth.service";
import { ContextProps } from "../types/props.types";
import { Auth } from "../types/user.types";

export const AuthContext = createContext<{
  auth: Auth | null;
  setAuth: any;
}>({ auth: null, setAuth: null });
const authData: Auth | null = getAuth();

const AuthContextProvider = ({ children }: ContextProps) => {
  const authReducer = (state: any, action: any) => {
    switch (action.type) {
      case "LOGIN":
        setAuth(action.payload.data, action.payload.rememberMe);
        return action.payload.data;
      case "LOGOUT":
        logout();
        return null;
      default:
        return state;
    }
  };
  const [auth, dispatch] = useReducer(authReducer, authData);

  return (
    <AuthContext.Provider value={{ auth, setAuth: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
