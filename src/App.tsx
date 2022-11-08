import AuthContextProvider from "./contexts/Auth.context";

import "./App.css";
import MainRoutes from "./Routes/Main.routes";

function App() {
  return (
    <AuthContextProvider>
      <MainRoutes></MainRoutes>
    </AuthContextProvider>
  );
}

export default App;
