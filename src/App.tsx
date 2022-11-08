import AuthContextProvider from "./contexts/Auth.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainRoutes from "./Routes/Main.routes";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <AuthContextProvider>
        <MainRoutes></MainRoutes>
      </AuthContextProvider>
    </>
  );
}

export default App;
