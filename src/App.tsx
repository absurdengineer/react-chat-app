import { ToastContainer } from "react-toastify";
import MainRoutes from "./Routes/Main.routes";
import AuthContextProvider from "./contexts/Auth.context";
import LocaleContextProvider from "./contexts/Locale.context";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <AuthContextProvider>
        <LocaleContextProvider>
          <MainRoutes></MainRoutes>
        </LocaleContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
