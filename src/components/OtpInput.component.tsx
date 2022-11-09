import { OtpInputProps } from "../types/props.types";

const OtpInput = ({
  value,
  name,
  type = "text",
  maxLength = 1,
  handleChange,
}: OtpInputProps) => {
  return (
    <input
      className="m-2 border h-10 w-10 text-center form-control rounded"
      type={type}
      onChange={handleChange}
      name={name}
      maxLength={maxLength}
      value={value}
    />
  );
};

export default OtpInput;
