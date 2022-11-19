import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/Auth.context";
import { LocaleContext } from "../contexts/Locale.context";
import httpService from "../services/http.service";
import {
  HandleChange,
  HandleSubmit,
  NoIO,
  Validate,
} from "../types/functions.types";
import FormInput from "./FormInput.component";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    identifierError: "",
    passwordError: "",
  });
  const { setAuth } = useContext(AuthContext);
  const { $t } = useContext(LocaleContext);

  const validateInput: Validate = () => {
    let identifierError = "",
      passwordError = "";
    const passwordReg = /^[a-zA-Z0-9]{8,}$/;
    if (!formData.identifier)
      identifierError = "Username/Email Address is Mandatory";
    if (!formData.password) passwordError = "Password is Mandatory";
    else if (!passwordReg.test(formData.password))
      passwordError =
        "Password can only be Alphanumeric with Minimum 8 Characters";
    setErrors({
      identifierError,
      passwordError,
    });
    return identifierError || passwordError;
  };

  const handleChange: HandleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck: NoIO = () => {
    setFormData({
      ...formData,
      rememberMe: !formData.rememberMe,
    });
  };

  const handleSubmit: HandleSubmit = async (event) => {
    toast.dismiss();
    event.preventDefault();
    if (validateInput()) return toast.error("Validation Error Occured");
    try {
      const { identifier, password } = formData;
      const { data } = await httpService.post(`/auth/login`, {
        identifier,
        password,
      });
      setAuth({
        type: "LOGIN",
        payload: {
          data: data.data,
          rememberMe: formData.rememberMe,
        },
      });
    } catch (error: any) {
      if (!error.response) return toast.error($t("errors.network-server-down"));
      if (error.response.status < 500)
        return toast.error($t(`codes.${error.response?.data?.code}`));
      toast.error($t("errors.internal-server-error"));
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Identifier input */}
      <FormInput
        name="identifier"
        value={formData.identifier}
        handleChange={handleChange}
        placeholder={$t("fields.username/email") + "*"}
        error={errors.identifierError}
      />
      {/* Password input */}
      <FormInput
        name="password"
        type="password"
        value={formData.password}
        handleChange={handleChange}
        placeholder={$t("fields.password") + "*"}
        error={errors.passwordError}
      />

      <div className="flex justify-between items-center mb-6">
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={handleCheck}
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="rememberMe"
          >
            {$t("texts.remember-me")}
          </label>
        </div>
        <Link className="text-gray-800" to="/auth/forgot-password">
          {$t("texts.forgot-password")}?
        </Link>
      </div>

      <div className="text-center lg:text-left">
        <button
          type="submit"
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {$t("texts.login")}
        </button>
        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          {$t("texts.dont-have-account")}?
          <Link
            className="ml-1 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            to="/auth/register"
          >
            {$t("texts.register")}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
