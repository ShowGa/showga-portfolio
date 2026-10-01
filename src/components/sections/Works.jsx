import React, { useRef, useState } from "react";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import { projects } from "../../constants";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useI18nHook from "../../hooks/useI18nHook";

const Works = () => {
    const { t } = useI18nHook(["section-Works", "constants-projects"]);
    const text = t("section-Works:header.text");
    const previewRef = useRef(null);
    const moveX = useRef(null); // gsap quickTo()
    const moveY = useRef(null); // gsap quickTo()
    const mousePosition = useRef({ x: 0, y: 0 });

    const overlayRefs = useRef([]);

    const [currentImgIndex, setCurrentImgIndex] = useState(null);

    useGSAP(() => {
        // move the desktop preview image with the performance optimization by using quickTo()
        moveX.current = gsap.quickTo(previewRef.current, "x", {
            duration: 1.2,
            ease: "power3.out",
        });
        moveY.current = gsap.quickTo(previewRef.current, "y", {
            duration: 2,
            ease: "power3.out",
        });

        // projects stagging animation
        gsap.from("#project", {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 1,
            stagger: 0.3,
            ease: "back.out",
            scrollTrigger: {
                trigger: "#project",
            },
        });
    }, []);

    const handleMouseEnter = (index) => {
        if (window.innerWidth < 768) return;
        setCurrentImgIndex(index);

        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });

        const el = overlayRefs.current[index];

        if (!el) return;

        gsap.killTweensOf(el); // kill the exsisting gsap animation on this element
        gsap.fromTo(
            el,
            {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            },
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 0.15,
                ease: "power2.out",
            },
        );
    };
    const handleMouseLeave = (index) => {
        if (window.innerWidth < 768) return;
        setCurrentImgIndex(null);

        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.out",
        });

        const el = overlayRefs.current[index];

        if (!el) return;

        gsap.killTweensOf(el); // kill the exsisting gsap animation on this element
        gsap.to(el, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 0.2,
            ease: "power2.in",
        });
    };

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;

        mousePosition.current.x = e.clientX + 24;
        mousePosition.current.y = e.clientY + 24;

        moveX.current(mousePosition.current.x);
        moveY.current(mousePosition.current.y);
    };

    return (
        <section id="work" className="flex flex-col min-h-screen">
            <AnimatedHeaderSection
                subTitle={
                    "Enjoy the process of learning, savor the result of building"
                }
                title={"Works"}
                text={text}
                textColor={"text-black"}
                withScrollTrigger={true}
            />

            <div
                className="relative flex flex-col font-light"
                onMouseMove={handleMouseMove}
            >
                {projects.map((project, index) => (
                    <a
                        href={project.href}
                        target="_blank"
                        key={project.id}
                        id="project"
                        className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
                        onMouseEnter={() => {
                            handleMouseEnter(index);
                        }}
                        onMouseLeave={() => {
                            handleMouseLeave(index);
                        }}
                    >
                        {/* overlay */}
                        <div
                            ref={(el) => (overlayRefs.current[index] = el)}
                            className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
                        />

                        {/* title */}
                        <div className="flex justify-between items-center px-10 text-black transition-all duration-500 md:items-start md:group-hover:px-12 md:group-hover:text-gold">
                            <h2 className="lg:text-[2rem] text-[1.625rem]">
                                {t(`constants-projects:projects.${index}.name`)}
                            </h2>

                            <Icon
                                icon="lucide:arrow-up-right"
                                className="md:size-6 size-5"
                            />
                        </div>

                        {/* divider */}
                        <div className="w-full h-[2px] bg-black/80"></div>

                        {/* framework */}
                        <div className="flex flex-wrap px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
                            {project.frameworks.map((framework) => (
                                <p
                                    key={framework.id}
                                    className="text-black transition-colors duration-500 md:group-hover:text-gold"
                                >
                                    {framework.name}
                                </p>
                            ))}
                        </div>

                        {/* mobile preview images */}
                        <div className="relative flex items-center justify-center px-5 md:hidden">
                            <div className="relative h-fit w-full rounded-md p-4 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center brightness-50"
                                    style={{
                                        backgroundImage: `url(${project.bgImage})`,
                                    }}
                                />

                                <img
                                    src={project.image}
                                    alt={`${project.name}-image`}
                                    className="relative z-10 object-cover rounded-md"
                                />
                            </div>
                        </div>
                    </a>
                ))}

                {/* Desktop Floating preview image */}
                <div
                    ref={previewRef}
                    className="fixed -top-3/14 left-0 z-50 overflow-hidden pointer-events-none w-120 md:block hidden opacity-0"
                >
                    {currentImgIndex !== null && (
                        <img
                            src={projects[currentImgIndex].image}
                            alt="preview"
                            className="object-cover w-full h-full border-8 border-black"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Works;

/*
========= Deleted Code ==========
<div className="relative flex items-center justify-center px-10 md:hidden">
    <div className="h-full w-full">
        <img
            src={project.bgImage}
            alt={`${project.name}-project background image`}
            className="object-cover w-full h-full rounded-md brightness-50"
        />
    </div>

    <div className="absolute bg-center px-14">
        <img
            src={project.image}
            alt={`${project.name}-image`}
            className="object-cover rounded-md"
        />
    </div>
</div> 

<div
    className="relative flex items-center justify-center px-10 md:hidden bg-cover bg-center rounded-md
    before:absolute 
    before:inset-0 before:bg-black/50 
    before:rounded-md"
    style={{
        backgroundImage: `url(${project.bgImage})`,
    }}
>
    <div className="relative z-10 h-full w-full">
        <img
            src={project.image}
            alt={`${project.name}-image`}
            className="object-cover rounded-md"
        />
    </div>
</div>


*/
