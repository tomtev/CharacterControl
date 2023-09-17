import { useHelper, Sky, Stars } from "@react-three/drei";
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
        position={[10, 200, 100]}
        intensity={2}
        castShadow
        shadow-bias={-0.000001}
        shadow-mapSize-height={6024}
        shadow-mapSize-width={6024}
        color={"pink"}
      />

      <fog attach="fog" args={["lightpink", 50, 200]} />
      <color attach="background" args={["lightpink"]} />
      <ambientLight intensity={0.1} />
      <mesh 
        position={[0, 0, 0]}
      >
        <boxBufferGeometry args={[1000, 0.1, 1000]} />
        <meshBasicMaterial color="blue" transparent={true} opacity={.8} />
      </mesh>
      <Stars count={1000} scale={[1000,,1000]}></Stars>
      <EffectComposer>
        <Bloom
          intensity={1} // The bloom intensity.
          luminanceThreshold={.7} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]      
        />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </>
  );
}
