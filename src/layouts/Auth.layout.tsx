import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Dropdown from "../components/Dropdown.component";
import { LocaleContext } from "../contexts/Locale.context";
import { availableLocales } from "../locale";

const AuthLayout = () => {
  const { locale, translate, setLocale } = useContext(LocaleContext);
  return (
    <>
      <div className="absolute top-16 right-8">
        <Dropdown
          options={availableLocales}
          value={locale}
          resourceName={translate("texts.language")}
          handleClick={(locale: string) => {
            setLocale({ type: "CHANGE", payload: locale });
          }}
        />
      </div>
      <Outlet />
    </>
  );
};

export default AuthLayout;
