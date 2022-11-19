import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput.component";
import OtpInput from "../components/OtpInput.component";
import { LocaleContext } from "../contexts/Locale.context";
import { resetPassword, verifyUser } from "../services/auth.service";
import { HandleChange, HandleSubmit } from "../types/functions.types";

const ResetPassword = () => {
  const [errors, setErrors] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
    password: "",
    confirmPassword: "",
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

  const validateResetPassword = (resetPassword: any) => {
    const resetPasswordSchema = Joi.object({
      code: Joi.number().integer().min(100000).max(999999).required().messages({
        "any.required": "123",
        "number.min": "124",
        "number.max": "124",
        "number.unsafe": "124",
        "number.base": "124",
      }),
      password: Joi.string()
        .min(8)
        .max(255)
        .regex(/^[a-zA-Z0-9]{8,}$/)
        .required()
        .messages({
          "any.required": "117",
          "string.empty": "118",
          "string.min": "119",
          "string.max": "120",
          "string.pattern.base": "122",
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "140",
          "any.required": "141",
          "string.empty": "142",
        }),
    });
    const { error } = resetPasswordSchema.validate(resetPassword, {
      abortEarly: false,
    });
    if (error) {
      let err: any;
      for (let detail of error.details) {
        err = { [`${detail.path[0]}`]: detail.message, ...err };
      }
      setErrors(err);
      return false;
    }
    setErrors({
      code: "",
      password: "",
      confirmPassword: "",
    });
    return true;
  };

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
    const valid = validateResetPassword({
      code: otp,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    if (!valid) {
      return;
    }
    try {
      await resetPassword({
        id: state.id,
        code: parseInt(otp),
        password: formData.password,
      });
      toast.success($t("texts.password-updated"));
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
      <div className="h-screen bg-white py-24 px-3 mt-48">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="bg-blue-300 h-120 py-4 rounded text-center"
              >
                <h1 className="text-2xl font-bold">
                  {$t("texts.verify-email")}
                </h1>
                <div className="flex flex-row justify-center text-center px-2 mt-5">
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
                {errors.code && (
                  <div className="flex flex-row justify-center text-center px-2 text-red-500">
                    {$t(`codes.${errors.code}`)}
                  </div>
                )}
                <div className="flex flex-row justify-center text-center px-2 mt-5">
                  <FormInput
                    type="password"
                    value={formData.password}
                    error={
                      errors.password ? $t(`codes.${errors.password}`) : ""
                    }
                    handleChange={handleChange}
                    name="password"
                    placeholder={$t("fields.password")}
                  />
                </div>
                <div className="flex flex-row justify-center text-center px-2">
                  <FormInput
                    type="password"
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    error={
                      errors.confirmPassword
                        ? $t(`codes.${errors.confirmPassword}`)
                        : ""
                    }
                    name="confirmPassword"
                    placeholder={$t("fields.confirm-password")}
                  />
                </div>
                <div className="flex justify-center text-center mt-5">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
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

export default ResetPassword;
