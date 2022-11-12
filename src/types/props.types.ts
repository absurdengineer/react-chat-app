import { ChangeEvent } from "react";
import { Auth } from "./user.types";

export interface ContextProps {
  children: JSX.Element;
}

export interface AuthenticatedRouteProps {
  auth: Auth | null;
  outlet: JSX.Element;
}

export interface FormInputProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string | null;
}

export interface OtpInputProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  name: string;
  maxLength?: number;
  type?: string;
  placeholder?: string;
}

export interface DropdownProps {
  options: { name: string; value: string }[];
  value: string;
  resourceName: string;
  closeOnClick?: boolean;
  handleClick: (newValue: string) => void;
}
