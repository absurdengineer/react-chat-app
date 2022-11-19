import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocaleContext } from "../contexts/Locale.context";
import { HandleChange, HandleSubmit } from "../types/functions.types";
import FormInput from "./FormInput.component";
import Joi from "joi";
import { ForgotPassword } from "../types/user.types";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/auth.service";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { $t } = useContext(LocaleContext);
  const navigate = useNavigate();

  const validateForgotPassword = (forgotPassword: ForgotPassword) => {
    const forgotPasswordSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .max(255)
        .required()
        .messages({
          "any.required": "105",
          "string.empty": "106",
          "string.min": "107",
          "string.max": "108",
          "string.email": "109",
        }),
    });
    const { error } = forgotPasswordSchema.validate(forgotPassword, {
      abortEarly: false,
    });
    if (error) {
      setEmailError(error.details[0].message);
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleChange: HandleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit: HandleSubmit = async (event) => {
    event.preventDefault();
    const valid = validateForgotPassword({ email });
    if (!valid) return;
    try {
      const { data } = await forgotPassword({ email });
      toast.success($t(`codes.${data?.code}`));
      navigate("/auth/reset-password", {
        state: {
          id: data.data,
        },
      });
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
      {/* Email input */}
      <FormInput
        name="email"
        type="email"
        value={email}
        handleChange={handleChange}
        placeholder={$t("fields.email") + "*"}
        error={emailError ? $t(`codes.${emailError}`) : ""}
      />
      <div className="text-center lg:text-left">
        <button
          type="submit"
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {$t("texts.submit")}
        </button>
      </div>
      <p className="text-sm font-semibold mt-2 pt-1 mb-0">
        {$t("texts.just-remembered")}?
        <Link
          className="ml-1 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
          to="/auth/login"
        >
          {$t("texts.login")}
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
