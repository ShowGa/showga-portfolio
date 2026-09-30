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
import LoadingOverlay from "./components/component/LoadingOverlay";

const App = () => {
    // functional hook
    useI18nToScrollTriggerRefresh(100);

    return (
        <ReactLenis root className="relative min-h-screen ">
            {/* loading screen */}
            <LoadingOverlay />

            <Navbar />
            <Hero />
            <ServiceSummary />
            <Services />
            <About />
            <Works />
            <ContactSummary />
            <Contact />
            {/* </div> */}
        </ReactLenis>
    );
};

export default App;
