import { createContext, useReducer } from "react";
import { $t, defaultLocale } from "../locale";
import { ContextProps } from "../types/props.types";

export const LocaleContext = createContext<{
  locale: string;
  setLocale: any;
  translate: (path: string) => string;
}>({ locale: defaultLocale, translate: (path) => "", setLocale: null });

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

  const translate = (path: string) => {
    return $t(path, locale);
  };

  return (
    <LocaleContext.Provider value={{ locale, translate, setLocale: dispatch }}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
