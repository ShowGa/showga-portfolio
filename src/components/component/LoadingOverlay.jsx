import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const LoadingOverlay = () => {
    const { progress } = useProgress();

    const hasStarted = useRef(false);

    const [isReadyForAnimation, setIsReadyForAnimation] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (progress >= 100 && !hasStarted.current) {
            hasStarted.current = true;

            setIsReadyForAnimation(true);

            setTimeout(() => {
                setIsReady(true);
            }, 2000);
        }
    }, [progress]);

    return (
        <>
            {!isReady && (
                <div
                    className={`fixed inset-0 z-999 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 delay-1000 font-light ${isReadyForAnimation ? "opacity-0" : "opacity-100"}`}
                >
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
        </>
    );
};

export default LoadingOverlay;
