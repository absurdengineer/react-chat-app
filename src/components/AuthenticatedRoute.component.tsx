import { Navigate } from "react-router";
import { AuthenticatedRouteProps } from "../types/props.types";

const AuthenticatedRoute = ({
  auth,
  outlet,
}: AuthenticatedRouteProps): JSX.Element => {
  if (!auth) {
    return <Navigate to="/auth" replace />;
  }
  return outlet;
};

export default AuthenticatedRoute;
