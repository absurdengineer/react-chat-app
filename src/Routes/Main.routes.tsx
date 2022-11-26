import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../components/AuthenticatedRoute.component";
import UnAuthenticatedRoute from "../components/UnAuthenticatedRoute.component";
import { AuthContext } from "../contexts/Auth.context";
import AppLayout from "../layouts/App.layout";
import AuthLayout from "../layouts/Auth.layout";
import Dashboard from "../pages/Dashboard.page";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login.page";
import NotFound from "../pages/NotFound.page";
import User from "../pages/User.page";
import Register from "../pages/Register.page";
import ResetPassword from "../pages/ResetPassword.page";
import Users from "../pages/Users.page";
import Verify from "../pages/Verify.page";

const MainRoutes = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="login"
          element={<UnAuthenticatedRoute auth={auth} outlet={<Login />} />}
        />
        <Route
          path="register"
          element={<UnAuthenticatedRoute auth={auth} outlet={<Register />} />}
        />
        <Route
          path="verify"
          element={<UnAuthenticatedRoute auth={auth} outlet={<Verify />} />}
        />
        <Route
          path="forgot-password"
          element={
            <UnAuthenticatedRoute auth={auth} outlet={<ForgotPassword />} />
          }
        />
        <Route
          path="reset-password"
          element={
            <UnAuthenticatedRoute auth={auth} outlet={<ResetPassword />} />
          }
        />
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Route>
      <Route path="/app" element={<AppLayout />}>
        <Route
          path="dashboard"
          element={<AuthenticatedRoute auth={auth} outlet={<Dashboard />} />}
        />
        <Route
          path="users/:id"
          element={<AuthenticatedRoute auth={auth} outlet={<User />} />}
        />
        <Route
          path="users/"
          element={<AuthenticatedRoute auth={auth} outlet={<Users />} />}
        />
        <Route index element={<Navigate to="/app/dashboard" />} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
      <Route index element={<Navigate to="/app/dashboard" />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default MainRoutes;
