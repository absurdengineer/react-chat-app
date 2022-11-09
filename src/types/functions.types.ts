import { ChangeEvent, SyntheticEvent } from "react";

export type HandleChange = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleSubmit = (event: SyntheticEvent<HTMLFormElement>) => void;
export type NoIO = () => void;
export type Validate = () => string;
