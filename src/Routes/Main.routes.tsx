import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../components/AuthenticatedRoute.component";
import UnAuthenticatedRoute from "../components/UnAuthenticatedRoute.component";
import { AuthContext } from "../contexts/Auth.context";
import Dashboard from "../pages/Dashboard.page";
import Login from "../pages/Login.page";
import NotFound from "../pages/NotFound.page";
import Profile from "../pages/Profile.page";
import Register from "../pages/Register.page";

const MainRoutes = () => {
  const auth = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/auth">
        <Route
          path="login"
          element={<UnAuthenticatedRoute auth={auth} outlet={<Login />} />}
        />
        <Route
          path="register"
          element={<UnAuthenticatedRoute auth={auth} outlet={<Register />} />}
        />
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Route>
      <Route path="/app">
        <Route
          path="dashboard"
          element={<AuthenticatedRoute auth={auth} outlet={<Dashboard />} />}
        />
        <Route
          path="profile"
          element={<AuthenticatedRoute auth={auth} outlet={<Profile />} />}
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
