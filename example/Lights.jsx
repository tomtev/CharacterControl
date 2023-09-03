import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>

      <spotLight
          position={[10, 200, 100]}
          intensity={1}
          castShadow
          shadow-mapSize-height={2024}
          shadow-mapSize-width={2024}
          color={'pink'}
          shadow-radius={5}
        />

        <color attach='background' args={['lightblue']} />
        <fog attach='fog' args={['lightblue', 0, 270]} />

      <ambientLight intensity={0.1} />
    </>
  );
}
