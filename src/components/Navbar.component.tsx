import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b-2 border-gray-200 px-2 sm:px-4 py-2.5 rounded-b dark:bg-gray-900 fixed w-full">
      <div className="container max-w-7x1 flex flex-wrap items-center justify-between mx-auto">
        <Link to="/app/dashboard" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-900">
            Namaste!
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                {!auth?.user.profilePic ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="relative w-10 h-10">
                    <img
                      className="rounded-full border border-gray-100 shadow-sm"
                      src={`http://localhost:1234/uploads/${auth?.user.profilePic}`}
                      alt="user"
                    />
                  </div>
                )}
              </button>
            </div>
            {openProfile && (
              <div
                className="cursor-pointer absolute right-0 z-10 mt-2 w-18 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none" onClick={() => {}}>
                  <p
                    onClick={() => {
                      navigate("/app/users/me");
                      setOpenProfile(false);
                    }}
                    className="text-gray-700 text-gray-700 block px-4 py-2 text-sm"
                  >
                    Profile
                  </p>
                </div>
                <div className="py-1" role="none" onClick={() => {}}>
                  <p
                    className="text-gray-700 text-gray-700 block px-4 py-2 text-sm"
                    onClick={() => {
                      setOpenProfile(false);
                      setAuth({ type: "LOGOUT" });
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/app/dashboard"
                className={`${
                  pathname === "/app/dashboard" ? "text-blue-700" : "text-black"
                } block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/app/users"
                className={`${
                  pathname === "/app/users" ? "text-blue-700" : "text-black"
                } block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0`}
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
