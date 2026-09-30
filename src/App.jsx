import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import ServiceSummary from "./components/sections/ServiceSummary";
import Services from "./components/sections/Services";
import ReactLenis from "lenis/react";
import About from "./components/sections/About";
import Works from "./components/sections/Works";
import ContactSummary from "./components/sections/ContactSummary";
import Contact from "./components/sections/Contact";
// hook
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import useI18nToScrollTriggerRefresh from "./hooks/useI18nToScrollTriggerRefresh";

const App = () => {
    // functional hook
    useI18nToScrollTriggerRefresh();

    // loading state base on 3D model (3D model must been download within the loading)
    const { progress } = useProgress();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                setIsReady(true);
            }, 1500);
        }
    }, [progress]);

    return (
        <ReactLenis root className="relative min-h-screen ">
            {/* loading screen */}
            {!isReady && (
                <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
                    <p className="mb-4 text-xl tracking-widest animate-pulse">
                        Loading {Math.floor(progress)} %
                    </p>

                    <div className="relative h-1 overflow-hidden rounded-2xl w-60 bg-white/20 ">
                        <div
                            className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
            <div
                className={`${isReady ? "opacity-100" : "opacity-0"} transition-all duration-1000`}
            >
                <Navbar />
                <Hero />
                <ServiceSummary />
                <Services />
                <About />
                <Works />
                <ContactSummary />
                <Contact />
            </div>
        </ReactLenis>
    );
};

export default App;
