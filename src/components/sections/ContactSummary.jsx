import { useRef } from "react";
import Marquee from "../component/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useI18nHook from "../../hooks/useI18nHook";

const items = ["Reliable", "Professional", "Collaboration", "Excellence"];
const items2 = ["Contact Me", "Contact Me", "Contact Me", "Contact Me"];

const ContactSummary = () => {
    const { t } = useI18nHook("section-ContactSummary");
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });
    }, []);

    return (
        <section
            ref={containerRef}
            className="flex flex-col items-center justify-between min-h-screen h-full gap-12 mt-16"
        >
            {/* marquee */}
            <Marquee items={items} />
            <div className="font-light text-center contact-text-responsive">
                <p>
                    {t("text.line1")} <br />
                    <span>{t("text.memorable")}</span> &{" "}
                    <span className="italic">{t("text.inspiring")}</span>
                    <br />
                    {t("text.line2")}{" "}
                    <span className="text-gold font-normal">
                        {t("text.together")}
                    </span>{" "}
                    {t("text.quoteEnd")}
                </p>
            </div>

            {/* marquee */}
            <Marquee
                items={items2}
                reverse={true}
                className="text-black bg-transparent border-y-2"
                iconClassName="stroke-gold stroke-2 text-primary"
                icon="material-symbols-light:square"
            />
        </section>
    );
};

export default ContactSummary;
