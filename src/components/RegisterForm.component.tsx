import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LocaleContext } from "../contexts/Locale.context";
import { register } from "../services/auth.service";
import FormInput from "./FormInput.component";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    nameError: "",
  });
  const navigate = useNavigate();
  const { $t } = useContext(LocaleContext);

  const validateInput = () => {
    let emailError = "",
      passwordError = "",
      usernameError = "",
      nameError = "";
    const passwordReg = /^[a-zA-Z0-9]{8,}$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.name) nameError = "Name is Mandatory";
    if (!formData.username) usernameError = "Username is Mandatory";
    else if (formData.username.length < 3)
      usernameError = "Username must be 3 characters long";
    if (!formData.email) emailError = "Email Address is Mandatory";
    else if (!emailRegex.test(formData.email))
      emailError = "Email must be a valid Email";
    if (!formData.password) passwordError = "Password is Mandatory";
    else if (!passwordReg.test(formData.password))
      passwordError = "Password must be Alphanumeric and 8 characters long";
    setErrors({
      emailError,
      passwordError,
      nameError,
      usernameError,
    });
    return emailError || passwordError || nameError || usernameError;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    toast.dismiss();
    event.preventDefault();
    if (validateInput()) return toast.error("Validation Error");
    try {
      const { data } = await register(formData);
      navigate("/auth/verify", {
        state: {
          id: data.data.id,
          email: data.data.email,
        },
      });
      toast.success($t(`codes.${data?.code}`));
    } catch (error: any) {
      if (!error.response) return toast.error($t("errors.network-server-down"));
      if (error.response.status < 500)
        return toast.error($t(`codes.${error.response?.data?.code}`));
      toast.error($t("errors.internal-server-error"));
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input */}
      <FormInput
        name="name"
        value={formData.name}
        handleChange={handleChange}
        placeholder={$t("fields.name")}
        error={errors.nameError}
      />
      {/* Username input */}
      <FormInput
        name="username"
        value={formData.username}
        handleChange={handleChange}
        placeholder={$t("fields.username")}
        error={errors.usernameError}
      />
      {/* Email input */}
      <FormInput
        name="email"
        value={formData.email}
        handleChange={handleChange}
        placeholder={$t("fields.email")}
        error={errors.emailError}
      />
      {/* Password input */}
      <FormInput
        name="password"
        type="password"
        value={formData.password}
        handleChange={handleChange}
        placeholder={$t("fields.password")}
        error={errors.passwordError}
      />
      <div className="text-center lg:text-left">
        <button
          type="submit"
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {$t("texts.register")}
        </button>
        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          {$t("texts.already-have-account")}
          <Link
            className="ml-1 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            to="/auth/login"
          >
            {$t("texts.login")}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
