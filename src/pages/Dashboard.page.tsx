import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

const Dashboard = () => {
  const { setAuth } = useContext(AuthContext);
  return (
    <>
      <div className="text-red-700 px-4 py-3" role="alert">
        <strong className="font-bold">Dashboard!</strong>
      </div>
      <button
        onClick={() => setAuth({ type: "LOGOUT" })}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
