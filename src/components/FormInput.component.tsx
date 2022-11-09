import { FormInputProps } from "../types/props.types";

const FormInput = ({
  handleChange,
  value,
  name,
  type = "text",
  placeholder = "Enter Text",
  error = "",
}: FormInputProps) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
      {error && (
        <div
          className="rounded-lg py-1  mt-1 text-base text-red-500"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
