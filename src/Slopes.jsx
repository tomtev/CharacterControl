import { RigidBody } from "@react-three/rapier";
import { useGLTF, Text } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Slopes() {
  // Load models
  const slopes = useGLTF("./test.glb");

  useEffect(() => {
    // Receive Shadows
    slopes.scene.traverseVisible((obj) => {
      obj.castShadow = true
      obj.receiveShadow = true

      if (obj.material?.map) obj.material.map.magFilter = THREE.NearestFilter
      if (obj.material?.map) obj.material.map.minFilter = THREE.LinearMipMapLinearFilter

      if (obj.material?.transparent) {
        obj.material.onBeforeCompile = function (shader) {
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <output_fragment>',
            ['#include <output_fragment>', 'gl_FragColor.a *= pow( gl_FragCoord.z, 5.0 );'].join('\n'),
          )
        }
        obj.material.depthWrite = true
        obj.material.alphaTest = 0.3
        obj.renderOrder = -1
      }

    })
  }, []);

  return (
    <group position={[5, 0, 30]}>
      <RigidBody type="fixed" colliders="trimesh" rotation={[0, Math.PI, 0]}>
      <primitive object={slopes.scene} scale={[1,1,1]} position={[0,-48,0]} />
      </RigidBody>
    </group>
  );
}
