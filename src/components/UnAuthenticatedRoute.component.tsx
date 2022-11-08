import { Navigate } from "react-router";
import { AuthenticatedRouteProps } from "../types/props.types";

const UnAuthenticatedRoute = ({
  auth,
  outlet,
}: AuthenticatedRouteProps): JSX.Element => {
  if (auth) {
    return <Navigate to="/app" replace />;
  }
  return outlet;
};

export default UnAuthenticatedRoute;
