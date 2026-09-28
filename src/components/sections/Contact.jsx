import { useGSAP } from "@gsap/react";
import { socials } from "../../constants";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import Marquee from "../component/Marquee";
import gsap from "gsap";

const text = `Whether you’re into frontend, design,
or building for the web, I’d love to connect,
exchange ideas, and create something meaningful together.`;

const items = [
    "Just Imagin, I code",
    "Just Imagin, I code",
    "Just Imagin, I code",
    "Just Imagin, I code",
];

const Contact = () => {
    useGSAP(() => {
        gsap.from(".social-link", {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 1,
            stagger: 0.3,
            ease: "back.out",
            scrollTrigger: {
                trigger: ".social-link",
            },
        });
    }, []);

    return (
        <section
            id="contact"
            className="flex flex-col justify-between min-h-screen bg-black"
        >
            <div>
                <AnimatedHeaderSection
                    subTitle={"Let's connect through shared interests"}
                    title={"Contact"}
                    text={text}
                    textColor={"text-white"}
                    withScrollTrigger={true}
                />

                <div className="flex px-10 font-light text-white uppercase lg:text-[2rem] text-[1.625rem] leading-none mb-10">
                    <div className="flex flex-col w-full gap-10">
                        <div className="social-link">
                            <h2>E-mail</h2>
                            <div className="w-full h-px my-2 bg-white/30" />
                            <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                                showgacareer@gmail.com
                            </p>
                        </div>

                        <div className="social-link">
                            <h2>Phone</h2>
                            <div className="w-full h-px my-2 bg-white/30" />
                            <p
                                className="text-xl lowercasemd
                            md:text-2xl lg:text-3xl"
                            >
                                N/A
                            </p>
                        </div>

                        <div className="social-link">
                            <h2>Social Media</h2>
                            <div className="w-full h-px my-2 bg-white/30" />
                            <div className="flex flex-wrap gap-2">
                                {socials.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 transition duration-200"
                                    >{`${social.name}`}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Marquee items={items} className="text-white bg-transparent" />
        </section>
    );
};

export default Contact;
