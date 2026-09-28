import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLine = ({ text, className }) => {
    const containerRef = useRef(null);
    const lineRefs = useRef([]);

    const lines = text.split("\n").filter((line) => line.trim() !== ""); // return the array of lines that split by the next row

    useGSAP(() => {
        if (lineRefs.current.length > 0) {
            gsap.from(lineRefs.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "back.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                },
            });
        }
    });

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    ref={(el) => (lineRefs.current[index] = el)}
                    className="block leading-relaxed tracking-wide text-pretty"
                >
                    {line}
                </span>
            ))}
        </div>
    );
};

export default AnimatedTextLine;
