import { useRef } from "react";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import AnimatedTextLine from "../component/AnimatedTextLine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const text = `ShowGa Hsiao here,
Web developer focus on frontend,
interesting in 3D and well design website
also a hardcore FPS gamer 
and poker card trick learner`;

const src = ["images/me.jpg", "images/me1.jpg", "images/me2.jpg"];

const About = () => {
    const imgRefs = useRef([]);

    useGSAP(() => {
        const images = imgRefs.current.filter(Boolean);

        // About section scale animation
        gsap.to("#about", {
            scale: 0.95,
            duration: 0.5,
            paused: true,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#about",
                start: "bottom 80%",
                toggleActions: "play none none reverse",
            },
        });

        // Initial state
        gsap.set(images, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });

        // Image reveal animation
        gsap.to(images, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
            ease: "power4.out",
            stagger: 0.5,
            scrollTrigger: {
                trigger: "#img_wrapper",
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });
    });

    return (
        <section id="about" className="min-h-screen bg-black rounded-b-4xl">
            <AnimatedHeaderSection
                subTitle={"Action comes from passion"}
                title={"About"}
                text={text}
                textColor={"text-white"}
                withScrollTrigger={true}
            />

            <div
                id="img_wrapper"
                className="flex flex-col items-stretch justify-start gap-16 px-10 pb-16 text-xl font-light tracking-wide md:text-2xl lg:flex-row lg:text-3xl text-white/60"
            >
                {src.map((image, index) => (
                    <div key={image} className="flex-1">
                        <img
                            ref={(el) => {
                                imgRefs.current[index] = el;
                            }}
                            src={image}
                            alt="man"
                            className="w-full h-full rounded-3xl object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;

/*
======= Question =======
1. How to make div's height like image in the flex





======= Deleted Code =======

<AnimatedTextLine text={aboutText} className={"w-full"} />



<div className="flex flex-col justify-between grow">
                    <h1 className="text-white text-8xl">ShowGa Hsiao</h1>

                    <div className="flex justify-between text-white">
                        <p className="font-light">p</p>

                        <p>
                            <AnimatedTextLine
                                text={testText}
                                className={"w-full"}
                            />
                        </p>
                    </div>
                </div>
*/

/*

import { useRef } from "react";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import AnimatedTextLine from "../component/AnimatedTextLine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const text = `I like turning the things I love into something
I can build, explore,
and understand through making.`;

const aboutText = `Obsessed with building fast, intuitive apps—from pixel-perfect React UIs to bulletproof serverless backends. Every line of code is a promise: quality that users feel.
  When I’m not shipping:
  - Open-sourcing my latest experiment (or hacking on yours)
  - Teaching devs on Twitch/YouTube—because rising tides lift all ships
  - Rock climbing (problem-solving with real stakes)
    - Strumming chords while CI pipelines pass (multitasking at its finest)`;

const testText = `
Lorem ipsum dolor, sit amet consectetur adipisicing
elit. Qui ipsum, officia error temporibus esse
explicabo quaerat necessitatibus aperiam id minus
enim voluptatem totam dignissimos, vitae laudantium
similique ipsam, excepturi natus!
`;

const About = () => {
    const imgRef = useRef(null);

    useGSAP(() => {
        // gsap.to("#about", {
        //     scale: 0.95,
        //     scrollTrigger: {
        //         trigger: "#about",
        //         start: "bottom 80%",
        //         end: "bottom 20%",
        //         scrub: true,
        //         markers: true,
        //     },
        //     ease: "power1.inOut",
        // });

        gsap.to("#about", {
            scale: 0.95,
            duration: 0.5,
            paused: true,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#about",
                start: "bottom 80%",
                toggleActions: "play none none reverse",
            },
        });

        gsap.set(imgRef.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });

        gsap.to(imgRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: imgRef.current,
            },
        });
    }, []);

    return (
        <section id="about" className="min-h-screen bg-black rounded-b-4xl">
            <AnimatedHeaderSection
                subTitle={"Action comes from passion"}
                title={"About"}
                text={text}
                textColor={"text-white"}
                withScrollTrigger={true}
            />

            <div className="flex flex-col items-stretch justify-start gap-16 px-10 pb-16 text-xl font-light tracking-wide md:text-2xl lg:flex-row lg:text-3xl text-white/60">
                <div className="flex-1">
                    <img
                        ref={imgRef}
                        src="images/me.jpg"
                        alt="man"
                        className="w-full rounded-3xl h-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <img
                        src="images/me1.jpg"
                        alt="man"
                        className="w-full rounded-3xl h-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <img
                        src="images/me2.jpg"
                        alt="man"
                        className="w-full rounded-3xl h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;

/*
======= Question =======
1. How to make div's height like image in the flex





======= Deleted Code =======

<AnimatedTextLine text={aboutText} className={"w-full"} />



<div className="flex flex-col justify-between grow">
                    <h1 className="text-white text-8xl">ShowGa Hsiao</h1>

                    <div className="flex justify-between text-white">
                        <p className="font-light">p</p>

                        <p>
                            <AnimatedTextLine
                                text={testText}
                                className={"w-full"}
                            />
                        </p>
                    </div>
                </div>
*/
