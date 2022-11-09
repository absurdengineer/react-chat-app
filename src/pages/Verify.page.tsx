import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "../components/OtpInput.component";
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

  const handleSubmit: HandleSubmit = (event) => {
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
    toast.success("User Verified Successfully!");
    navigate("/auth/login");
  };

  return (
    <div className="h-screen bg-white py-20 px-3 mt-48">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-blue-300 h-80 py-3 rounded text-center"
            >
              <h1 className="text-2xl font-bold">Verify OTP</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">mdd*****@**m</span>
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
                  <span className="font-bold">Resend OTP</span>
                  <i className="bx bx-caret-right ml-1"></i>
                </p>
              </div>
              <div className="flex justify-center text-center mt-5">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;