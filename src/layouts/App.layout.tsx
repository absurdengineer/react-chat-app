import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.component";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="sm:pt-20 pt-14">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
