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
        position={[100, 300, 100]}
        intensity={1}
        castShadow
        shadow-bias={-0.00001}
        shadow-mapSize-height={2024}
        shadow-mapSize-width={2024}
        color={"pink"}
      />

      <fog attach="fog" args={["lightpink", 100, 200]} />
      <color attach="background" args={["lightpink"]} />
      <ambientLight intensity={0.2} />
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry args={[1000, 0.1, 1000]} />
        <meshBasicMaterial color="blue" transparent={true} opacity={0.6} />
      </mesh>
      <Stars count={1000} scale={[1000, 100, 1000]}></Stars>

      <Suspense fallback={null}>
        <EffectComposer multisampling={0}>

          <SSAO
            blendFunction={BlendFunction.MULTIPLY} // blend mode
          
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
     
        </EffectComposer>
      </Suspense>
    </>
  );
}
