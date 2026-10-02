import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let timer;

const useI18nToScrollTriggerRefresh = (delay = 300) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const refresh = () => {
            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
                ScrollTrigger.refresh(true);
            }, delay);
        };

        i18n.on("languageChanged", refresh);

        return () => {
            i18n.off("languageChanged", refresh);
        };
    }, [i18n, delay]);
};

export default useI18nToScrollTriggerRefresh;
