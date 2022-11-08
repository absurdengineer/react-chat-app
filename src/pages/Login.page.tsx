import { login } from "../services/auth.service";

const Login = () => {
  return (
    <>
      <div className="text-red-700 px-4 py-3" role="alert">
        <strong className="font-bold">Login!</strong>
      </div>
      <button
        onClick={() => {
          login();
        }}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Login
      </button>
    </>
  );
};

export default Login;
