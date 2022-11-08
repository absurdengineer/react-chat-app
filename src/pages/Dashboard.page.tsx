import React from "react";
import { logout } from "../services/auth.service";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
