import { useTranslation } from "react-i18next";

const useI18nHook = (ns) => {
    const { t, i18n } = useTranslation(ns);

    const switchLang = (lng) => {
        i18n.changeLanguage(lng);

        localStorage.setItem("i18nextLng", lng);

        window.location.reload();
    };

    return {
        t,
        i18n,
        switchLang,
    };
};

export default useI18nHook;
