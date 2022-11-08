import React from "react";
import { logout } from "../services/auth.service";

const Dashboard = () => {
  return (
    <>
      <div className="text-red-700 px-4 py-3" role="alert">
        <strong className="font-bold">Dashboard!</strong>
      </div>
      <button
        onClick={logout}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
