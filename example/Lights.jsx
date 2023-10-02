import { useHelper, Sky, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  DepthOfField,
  Autofocus,
  LensFlare,
  Bloom,
  SSAO,
  SMAA,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Lights() {
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <spotLight
        position={[100, 150, 0]}
        intensity={1.3}
        castShadow
        shadow-bias={-0.00001}
        shadow-mapSize-height={4024}
        shadow-mapSize-width={4024}
        color={"pink"}
      />

      <fog attach="fog" args={["lightblue", 120, 200]} />
      <color attach="background" args={["lightblue"]} />
      <ambientLight intensity={0.15} />
      <mesh position={[0, 90, 0]}>
        <boxBufferGeometry args={[1000, 0.1, 1000]} />
        <meshBasicMaterial color="blue" transparent={true} opacity={0.6} />
      </mesh>

      <Suspense fallback={null}>
        <EffectComposer multisampling={0}>
          <SMAA></SMAA>
          <DepthOfField focalLength={1} bokehScale={3}> </DepthOfField>
          <Vignette eskil={true} offset={0.1} darkness={.5} />
        </EffectComposer>
      </Suspense>
    </>
  );
}
