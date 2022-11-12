import en from "./en.json";
import es from "./es.json";

export const defaultLocale: string = "en";
export const fallbackLocale: string = "en";

interface Messages {
  [key: string]: Object;
}

const locales: Messages | string = {
  en: en,
  es: es,
};

export const availableLocales = [
  {
    value: "en",
    name: "English",
  },
  {
    value: "es",
    name: "Español",
  },
];

export const translate = (
  path: string,
  locale: string = defaultLocale
): string => {
  const message = path
    .split(".")
    .reduce((o: any, p) => (o[p] ? o[p] : path), locales[locale]);
  return message;
};

const locale = {
  availableLocales,
  defaultLocale,
  fallbackLocale,
  translate,
};

export default locale;
