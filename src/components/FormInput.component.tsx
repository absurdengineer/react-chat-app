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
      <label
        htmlFor={name}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
      >
        {placeholder}
      </label>
      <input
        type={type}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
