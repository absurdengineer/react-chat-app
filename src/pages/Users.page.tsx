import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LocaleContext } from "../contexts/Locale.context";
import { getJoinedOn } from "../helpers/date.helpers";
import { getUsers } from "../services/user.service";

const demoImage =
  "https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg";

const Users = () => {
  const [users, setUsers] = useState([]);

  const { $t } = useContext(LocaleContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUsers();
        setUsers(data.data);
      } catch (error: any) {
        if (!error.response)
          return toast.error($t("errors.network-server-down"));
        if (error.response.status < 500)
          return toast.error($t(`codes.${error.response?.data?.code}`));
        toast.error($t("errors.internal-server-error"));
        console.log(error);
      }
    })();
  }, [$t]);

  return (
    <section className="text-gray-600 body-font sm:px-4">
      <div className="container py-5 mx-auto max-w-7x1">
        <div className="flex flex-wrap w-full mb-4">
          <div className="w-full mb-6 lg:mb-0">
            <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">
              Users
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {users.map((user: any) => (
            <div className="w-1/2 flex justify-center my-3">
              <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                <img
                  className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={
                    user.profilePic
                      ? `http://localhost:1234/uploads/${user.profilePic}`
                      : demoImage
                  }
                  alt=""
                />
                <div className="p-6 flex flex-col justify-start">
                  <Link
                    to={`/app/users/${user.id}`}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl font-medium mb-2"
                  >
                    {user.name}
                  </Link>
                  <h3 className="text-black text-xs font-medium title-font">
                    @{user.username}
                  </h3>
                  <p className="text-gray-700 text-base mb-4">{user.status}</p>
                  <p className="text-gray-600 text-xs">
                    {getJoinedOn(user.createdOn)}
                  </p>
                  <div className="my-5">
                    <button
                      type="button"
                      className="block my-2 px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Request
                    </button>
                    <button
                      type="button"
                      className="block my-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Users;
