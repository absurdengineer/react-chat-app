import { createContext, useReducer } from "react";
import { translate, defaultLocale } from "../locale";
import { ContextProps } from "../types/props.types";

export const LocaleContext = createContext<{
  locale: string;
  setLocale: any;
  $t: (path: string) => string;
}>({ locale: defaultLocale, $t: (path) => "", setLocale: null });

const LocaleContextProvider = (props: ContextProps) => {
  const localeReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE":
        return action.payload;
      case "RESET":
        return defaultLocale;
      default:
        return state;
    }
  };
  const [locale, dispatch] = useReducer(localeReducer, defaultLocale);

  const $t = (path: string) => {
    return translate(path, locale);
  };

  return (
    <LocaleContext.Provider value={{ locale, $t, setLocale: dispatch }}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
