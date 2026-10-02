import { useTranslation } from "react-i18next";

const useI18nHook = (ns) => {
    const { t, i18n } = useTranslation(ns);

    const switchLang = async (lng) => {
        await i18n.changeLanguage(lng);

        localStorage.setItem("i18nextLng", lng);
    };

    return {
        t,
        i18n,
        switchLang,
    };
};

export default useI18nHook;
