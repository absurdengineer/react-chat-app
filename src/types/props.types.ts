import { ChangeEvent } from "react";
import { Auth } from "./user.types";

export interface AuthContextProps {
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
