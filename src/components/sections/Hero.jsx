import { Canvas } from "@react-three/fiber";
import { Planet } from "../component/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../component/AnimatedHeaderSection";
import { ShowGaLogo } from "../component/ShowGaLogo";

const aboutText = `I like to build interesting things
that touch people's feelings
through visual design and interaction`;

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });

    return (
        <section id="home" className="flex flex-col justify-end min-h-screen">
            <AnimatedHeaderSection
                subTitle={`404 No Bugs Found`}
                title={"ShowGa"}
                text={aboutText}
                textColor={"text-black"}
            />

            <figure
                className="absolute inset-0 -z-50"
                style={{ width: "100%", height: "100vh" }}
            >
                <Canvas
                    shadows
                    camera={{
                        position: [0, 0, -10],
                        fov: 17.5,
                        near: 1,
                        far: 20,
                    }}
                >
                    <ambientLight intensity={0.5} />

                    <Float speed={0.5} floatIntensity={2}>
                        <ShowGaLogo scale={isMobile ? 1.4 : 2.4} />
                    </Float>

                    <Environment
                        files="/textures/lobby.hdr"
                        environmentIntensity={0.5}
                    />
                </Canvas>
            </figure>
        </section>
    );
};

export default Hero;

/*
======= Deleted Code =======

// Environment
<group rotation={[-Math.PI / 3, 4, 1]}>
    <Lightformer
        form={"circle"}
        intensity={1}
        position={[0, 5, -9]}
        scale={10}
    />
    <Lightformer
        form={"circle"}
        intensity={1}
        position={[0, 3, 1]}
        scale={10}
    />
    <Lightformer
        form={"circle"}
        intensity={1}
        position={[-5, -1, -1]}
        scale={10}
    />
    <Lightformer
        form={"circle"}
        intensity={1}
        position={[10, 1, 0]}
        scale={16}
    />
</group>


*/
