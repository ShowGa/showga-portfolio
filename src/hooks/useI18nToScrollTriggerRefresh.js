import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useI18nToScrollTriggerRefresh = (delay) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        let timer;

        const refresh = () => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                requestAnimationFrame(() => ScrollTrigger.refresh());
            }, delay);
        };

        i18n.on("loaded", refresh);
        i18n.on("languageChanged", refresh);

        return () => {
            clearTimeout(timer);
            i18n.off("loaded", refresh);
            i18n.off("languageChanged", refresh);
        };
    }, [i18n, delay]);
};

export default useI18nToScrollTriggerRefresh;
