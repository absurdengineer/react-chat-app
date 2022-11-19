import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LocaleContext } from "../contexts/Locale.context";
import { HandleChange, HandleSubmit } from "../types/functions.types";
import FormInput from "./FormInput.component";
import Joi from "joi";
import { ForgotPassword } from "../types/user.types";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { $t } = useContext(LocaleContext);

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
  const handleSubmit: HandleSubmit = (event) => {
    event.preventDefault();
    const valid = validateForgotPassword({ email });
    if (!valid) return;
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
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
