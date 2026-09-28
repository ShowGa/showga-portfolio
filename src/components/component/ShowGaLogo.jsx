import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function ShowGaLogo(props) {
    const { nodes, materials } = useGLTF("/models/showga_logo.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Logo.geometry}
                material={materials.Logo_Material}
                rotation={[Math.PI / 2, 0, Math.PI]}
                scale={4}
            />
        </group>
    );
}

useGLTF.preload("/showga_logo.glb");
