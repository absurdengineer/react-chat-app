import { useRef, useState } from "react";
import { DropdownProps } from "../types/props.types";

const Dropdown = ({
  options,
  value,
  resourceName,
  handleClick,
  closeOnClick = true,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const menu = useRef(null);

  const handleOptionClick = (newValue: string) => {
    if (!(value === newValue)) handleClick(newValue);
    if (closeOnClick) setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menu}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded="true"
          aria-haspopup="true"
        >
          {resourceName} : {value.toUpperCase()}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {open && (
        <div
          className="cursor-pointer absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {options.map((item, i) => (
            <div
              className="py-1"
              role="none"
              key={i}
              onClick={() => handleOptionClick(item.value)}
            >
              <p
                className={`${
                  value === item.value
                    ? "text-gray-900 text-blue-500 font-bold"
                    : "text-gray-700"
                } text-gray-700 block px-4 py-2 text-sm`}
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                {item.value.toUpperCase()}: {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
