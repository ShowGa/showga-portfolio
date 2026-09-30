import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import { servicesData } from "../../constants";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useI18nHook from "../../hooks/useI18nHook";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const { t } = useI18nHook(["section-Services", "constants-services"]);
    const text = t("section-Services:header.text");
    const servicesRef = useRef([]);
    // const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

    useGSAP(() => {
        servicesRef.current.forEach((el) => {
            if (!el) return;

            gsap.from(el, {
                y: 200,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                },
                duration: 1,
                ease: "circ.out",
            });
        });
    }, []);

    return (
        <section id="services" className="min-h-screen bg-black rounded-t-4xl">
            <AnimatedHeaderSection
                subTitle={
                    "Learning from building, feeling through experiencing"
                }
                title={"Skills"}
                text={text}
                textColor={"text-white"}
                withScrollTrigger={true}
            />

            {servicesData.map((service, index) => (
                <div
                    ref={(el) => (servicesRef.current[index] = el)}
                    key={index}
                    // style={{ top: `${index * 5}rem` }}
                    className={`sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30`}
                    style={{ top: 0 }}
                >
                    <div className="flex items-center justify-center gap-4 font-light">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-4xl lg:text-5xl">
                                {t(
                                    `constants-services:services.${index}.title`,
                                )}
                            </h2>

                            <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60">
                                {t(
                                    `constants-services:services.${index}.description`,
                                )}
                            </p>

                            <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-2xl text-white/80">
                                {service.items.map((item, itemIndex) => (
                                    <div key={`item-${index}-${itemIndex}`}>
                                        <h3 className="flex">
                                            <span className="mr-12 text-lg text-white/30">
                                                0{itemIndex + 1}
                                            </span>
                                            {t(
                                                `constants-services:services.${index}.items.${itemIndex}.title`,
                                            )}
                                        </h3>

                                        {itemIndex < service.items.length && (
                                            <div className="w-full h-px my-2 bg-white/30"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Services;

/*
{
                                  top: `calc(10vh + ${index * 5}em)`,
                                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                              }

*/
