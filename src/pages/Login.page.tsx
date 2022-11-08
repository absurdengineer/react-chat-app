import React, { useContext } from "react";
import { login } from "../services/auth.service";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
