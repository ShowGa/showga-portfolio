import { useEffect, useRef, useState } from "react";
import { socials } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const navItem = ["home", "services", "about", "work", "contact"];

const Navbar = () => {
    // ref
    const navRef = useRef(null);
    const linkRef = useRef([]);
    const contactRef = useRef(null);
    const topLineRef = useRef(null);
    const bottomLineRef = useRef(null);
    const crossTopLineRef = useRef(null);
    const crossBottomLineRef = useRef(null);
    // gsap animation timeline ref
    const tl = useRef(null);
    const iconTl = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [showBurger, setShowBurger] = useState(true);

    useGSAP(() => {
        gsap.set(navRef.current, { xPercent: 100 });
        gsap.set([linkRef.current, contactRef.current], {
            autoAlpha: 0, // opacity 0 , visibility hidden
            x: -20,
        });

        tl.current = gsap
            .timeline({ paused: true }) // paused = true to pause gsap animations timeline
            .to(navRef.current, {
                xPercent: 0,
                duration: 1,
                ease: "power3.out",
            })
            .to(
                linkRef.current,
                {
                    autoAlpha: 1,
                    x: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "<", // positional parameter => < means start this animations as previous one
            )
            .to(
                contactRef.current,
                {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "<+0.6",
            );

        iconTl.current = gsap
            .timeline({ paused: true })
            .to([topLineRef.current, bottomLineRef.current], {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.inOut",
            })
            .to(crossTopLineRef.current, {
                rotate: 45,
                duration: 0.3,
                ease: "power2.inOut",
            })
            .to(
                crossBottomLineRef.current,
                {
                    rotate: -45,
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                "<",
            );
    }, []);

    // functions
    const toggleMenu = () => {
        if (isOpen) {
            tl.current.reverse();
            iconTl.current.reverse();
        } else {
            tl.current.play();
            iconTl.current.play();
        }

        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let previousScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            if (isOpen) return;

            ticking = true;

            setTimeout(() => {
                const currentScrollY = window.scrollY;

                setShowBurger(
                    currentScrollY <= previousScrollY || currentScrollY < 10,
                );

                previousScrollY = currentScrollY;

                ticking = false;
            }, 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]); // Closure feature of JavaScript

    return (
        <>
            {/* Nav */}
            <nav
                ref={navRef}
                className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
            >
                {/* <div className="flex gap-5">
                    <button className="text-white/30">中文</button>
                    <div> | </div>
                    <button>EN</button>
                </div> */}

                {/* Navbar Item */}
                <div className="flex flex-col text-5xl gap-y-2 md:text-5xl lg:text-7xl">
                    {navItem.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (linkRef.current[index] = el)}
                        >
                            <Link
                                className="transition-all duration-300 cursor-pointer hover:text-white"
                                to={`${item}`}
                                smooth
                                offset={0}
                                duration={2000}
                            >
                                {item}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Contact Informations */}
                <div
                    ref={contactRef}
                    className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
                >
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">E-mail</p>
                        <p className="text-xl tracking-widest  lowercase text-pretty">
                            mybigduck@gmail.com
                        </p>
                    </div>
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">
                            Social Media
                        </p>
                        <p className="flex flex-col flex-wrap md:flex-row gap-x-2">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                                >
                                    {`${social.name}`}
                                </a>
                            ))}
                        </p>
                    </div>
                </div>
            </nav>

            {/* Nav Button */}
            <div
                style={
                    showBurger
                        ? { clipPath: "circle(50% at 50% 50%)" }
                        : { clipPath: "circle(0% at 50% 50%)" }
                }
                onClick={toggleMenu}
                className="fixed z-50 flex flex-col items-center justify-center gap-3 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-4"
            >
                {/* top line */}
                <span
                    ref={topLineRef}
                    className="shrink-0 w-8 h-1 bg-white rounded-full origin-center"
                ></span>
                {/* crossTop line */}
                <span
                    ref={crossTopLineRef}
                    className="absolute block w-8 h-1 bg-white rounded-full origin-center"
                ></span>
                {/* crossBottom line */}
                <span
                    ref={crossBottomLineRef}
                    className="absolute block w-8 h-1 bg-white rounded-full origin-center"
                ></span>
                {/* bottom line */}
                <span
                    ref={bottomLineRef}
                    className="block shrink-0 w-8 h-1 bg-white rounded-full origin-center"
                ></span>
            </div>
        </>
    );
};

export default Navbar;

// ======================= Origin ======================== //
// import { useEffect, useRef, useState } from "react";
// import { socials } from "../constants";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

// const navItem = ["home", "services", "about", "work", "contact"];

// const Navbar = () => {
//     // ref
//     const navRef = useRef(null);
//     const linkRef = useRef([]);
//     const contactRef = useRef(null);
//     const topLineRef = useRef(null);
//     const bottomLineRef = useRef(null);
//     // gsap animation timeline ref
//     const tl = useRef(null);
//     const iconTl = useRef(null);

//     const [isOpen, setIsOpen] = useState(false);
//     const [showBurger, setShowBurger] = useState(true);

//     useGSAP(() => {
//         gsap.set(navRef.current, { xPercent: 100 });
//         gsap.set([linkRef.current, contactRef.current], {
//             autoAlpha: 0, // opacity 0 , visibility hidden
//             x: -20,
//         });

//         tl.current = gsap
//             .timeline({ paused: true }) // paused = true to pause gsap animations timeline
//             .to(navRef.current, {
//                 xPercent: 0,
//                 duration: 1,
//                 ease: "power3.out",
//             })
//             .to(
//                 linkRef.current,
//                 {
//                     autoAlpha: 1,
//                     x: 0,
//                     stagger: 0.1,
//                     duration: 0.5,
//                     ease: "power2.out",
//                 },
//                 "<", // positional parameter => < means start this animations as previous one
//             )
//             .to(
//                 contactRef.current,
//                 {
//                     autoAlpha: 1,
//                     x: 0,
//                     duration: 0.5,
//                     ease: "power2.out",
//                 },
//                 "<+0.6",
//             );

//         iconTl.current = gsap
//             .timeline({ paused: true })
//             .to(topLineRef.current, {
//                 rotate: 45,
//                 y: 3.9,
//                 duration: 0.3,
//                 ease: "power2.inOut",
//             })
//             .to(
//                 bottomLineRef.current,
//                 {
//                     rotate: -45,
//                     y: -3.9,
//                     duration: 0.3,
//                     ease: "power2.inOut",
//                 },
//                 "<",
//             );
//     }, []);

//     // functions
//     const toggleMenu = () => {
//         if (isOpen) {
//             tl.current.reverse();
//             iconTl.current.reverse();
//         } else {
//             tl.current.play();
//             iconTl.current.play();
//         }

//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
//         let previousScrollY = window.scrollY;
//         let ticking = false;

//         const handleScroll = () => {
//             if (ticking || isOpen) return;

//             ticking = true;

//             setTimeout(() => {
//                 const currentScrollY = window.scrollY;

//                 setShowBurger(
//                     currentScrollY <= previousScrollY || currentScrollY < 10,
//                 );

//                 previousScrollY = currentScrollY;

//                 ticking = false;
//             }, 100);
//         };

//         window.addEventListener("scroll", handleScroll, { passive: true });

//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [isOpen]); // Closure feature of JavaScript

//     return (
//         <>
//             {/* Nav */}
//             <nav
//                 ref={navRef}
//                 className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
//             >
//                 {/* Navbar Item */}
//                 <div className="flex flex-col text-5xl gap-y-2 md:text-5xl lg:text-7xl">
//                     {navItem.map((item, index) => (
//                         <div
//                             key={index}
//                             ref={(el) => (linkRef.current[index] = el)}
//                         >
//                             <a className="transition-all duration-300 cursor-pointer hover:text-white">
//                                 {item}
//                             </a>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Contact Informations */}
//                 <div
//                     ref={contactRef}
//                     className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
//                 >
//                     <div className="font-light">
//                         <p className="tracking-wider text-white/50">E-mail</p>
//                         <p className="text-xl tracking-widest  lowercase text-pretty">
//                             mybigduck@gmail.com
//                         </p>
//                     </div>
//                     <div className="font-light">
//                         <p className="tracking-wider text-white/50">
//                             Social Media
//                         </p>
//                         <p className="flex flex-col flex-wrap md:flex-row gap-x-2">
//                             {socials.map((social, index) => (
//                                 <a
//                                     key={index}
//                                     href={social.href}
//                                     className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
//                                 >
//                                     {`{ ${social.name} }`}
//                                 </a>
//                             ))}
//                         </p>
//                     </div>
//                 </div>
//             </nav>

//             {/* Nav Button */}
//             <div
//                 style={
//                     showBurger
//                         ? { clipPath: "circle(50% at 50% 50%)" }
//                         : { clipPath: "circle(0% at 50% 50%)" }
//                 }
//                 onClick={toggleMenu}
//                 className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-4"
//             >
//                 <span
//                     ref={topLineRef}
//                     className="block shrink-0 w-8 h-1 bg-white rounded-full origin-center"
//                 ></span>
//                 <span
//                     ref={bottomLineRef}
//                     className="block shrink-0 w-8 h-1 bg-white rounded-full origin-center"
//                 ></span>
//             </div>
//         </>
//     );
// };

// export default Navbar;
