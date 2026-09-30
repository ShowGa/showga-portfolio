import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLine = ({ text, className }) => {
    const containerRef = useRef(null);
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    useGSAP(
        () => {
            gsap.from(".line", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "back.out",
                scrollTrigger: { trigger: containerRef.current },
            });
        },
        { scope: containerRef, dependencies: [text], revertOnUpdate: true },
    );

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    className="line block leading-relaxed tracking-wide text-pretty"
                >
                    {line}
                </span>
            ))}
        </div>
    );
};

export default AnimatedTextLine;
