import { Auth } from "./user.types";

export interface AuthContextProps {
  children: JSX.Element;
}

export interface AuthenticatedRouteProps {
  auth: Auth | null;
  outlet: JSX.Element;
}
