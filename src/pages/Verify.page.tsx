import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "../components/OtpInput.component";
import { LocaleContext } from "../contexts/Locale.context";
import { verifyUser } from "../services/auth.service";
import { HandleChange, HandleSubmit } from "../types/functions.types";

const Verify = () => {
  const [formData, setFormData] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });

  const handleChange: HandleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const { state } = useLocation();
  const { $t } = useContext(LocaleContext);

  useEffect(() => {
    if (!state) {
      toast.error("Nothing to verify");
      navigate("/auth/login");
    }
  });

  const handleSubmit: HandleSubmit = async (event) => {
    toast.dismiss();
    event.preventDefault();
    const otp =
      formData.first +
      formData.second +
      formData.third +
      formData.fourth +
      formData.fifth +
      formData.sixth;
    if (otp.length < 6) return toast.error("Please fill the otp first");
    try {
      await verifyUser({ id: state.id, code: parseInt(otp) });
      toast.success("User Verified Successfully!");
      navigate("/auth/login");
    } catch (error: any) {
      if (!error.response) return toast.error($t("errors.network-server-down"));
      if (error.response.status < 500)
        return toast.error($t(`codes.${error.response?.data?.code}`));
      toast.error($t("errors.internal-server-error"));
      console.log(error);
    }
  };

  return (
    state && (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-900">
                  Namaste!
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-900">
                  {$t("texts.verify-email")}
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  {$t("texts.enter-otp-received")}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="py-4 rounded text-center"
              >
                <div className="flex flex-col mt-4">
                  <span className="font-bold">
                    {state.email.replace(
                      /(\w{2})[\w.-]+@([\w.]+\w)/,
                      "$1***@$2"
                    )}
                  </span>
                </div>

                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <OtpInput
                    name="first"
                    maxLength={1}
                    value={formData.first}
                    handleChange={handleChange}
                  />
                  <OtpInput
                    name="second"
                    maxLength={1}
                    value={formData.second}
                    handleChange={handleChange}
                  />
                  <OtpInput
                    name="third"
                    maxLength={1}
                    value={formData.third}
                    handleChange={handleChange}
                  />
                  <OtpInput
                    name="fourth"
                    maxLength={1}
                    value={formData.fourth}
                    handleChange={handleChange}
                  />
                  <OtpInput
                    name="fifth"
                    maxLength={1}
                    value={formData.fifth}
                    handleChange={handleChange}
                  />
                  <OtpInput
                    name="sixth"
                    maxLength={1}
                    value={formData.sixth}
                    handleChange={handleChange}
                  />
                </div>

                <div className="flex justify-center text-center mt-5">
                  <p className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                    <span className="font-bold">{$t("texts.resend-otp")}</span>
                    <i className="bx bx-caret-right ml-1"></i>
                  </p>
                </div>
                <div className="flex justify-center text-center mt-5">
                  <button
                    onClick={() => {
                      navigate("/auth/login");
                    }}
                    className="w-1/3 mx-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50"
                  >
                    {$t("texts.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 mx-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    {$t("texts.verify")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Verify;
