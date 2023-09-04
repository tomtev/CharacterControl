import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
} from '@react-three/postprocessing'

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
        <fog attach='fog' args={['lightblue', 0, 200]} />

      <ambientLight intensity={0.1} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} luminanceSmoothing={1} height={300} />
        <DepthOfField focusDistance={0} focalLength={0.1} bokehScale={0.5} height={480} />
      
      </EffectComposer>
    </>
  );
}
