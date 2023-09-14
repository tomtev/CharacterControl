import { useHelper, Sky } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";

export default function Lights() {
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <spotLight
        position={[100, 100, 100]}
        intensity={1}
        castShadow
        shadow-bias={-0.00001}
        shadow-mapSize-height={6024}
        shadow-mapSize-width={6024}
        color={"pink"}
      />

      <fog attach="fog" args={["lightblue", 50, 200]} />
      <Sky sunPosition={[100, 100, 100]} />

      <ambientLight intensity={.3} />
      <EffectComposer>
        <Bloom luminanceThreshold={2} luminanceSmoothing={1} height={500} />
      </EffectComposer>
    </>
  );
}
