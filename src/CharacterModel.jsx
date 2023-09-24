import { useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import useGame from "./stores/useGame";

export default function CharacterModel(props) {
  // Change the character src to yours
  const character = useGLTF("./man.gltf");
  const animations = useAnimations(character.animations, character.scene);

  /**
   * Character animations setup
   */
  const curAnimation = useGame((state) => state.curAnimation);
  const initializeAnimationSet = useGame(
    (state) => state.initializeAnimationSet
  );

  // Rename your character animations here
  const animationSet = {
    idle: "Idle 01",
    walkSlow: "Walk 01",
    walk: "Run 01",
    run: "Sprint 01",
    jump: "Jump 01",
    hit: "Get Hit 01",
    jumpIdle: "Fall 01",
    attack: "Attack 01",
    jumpAttack: "Air Attack 01",
    jumpLand: "Land 01",
    duck: "Fall 01", // This is for falling from high sky
    wave: "Wave 01",
  };

  useEffect(() => {
    // Receive and cast Shadows
    character.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.roughness = 1;
        child.material.metalness = -1;
      }
    });

    // Initialize animation set
    initializeAnimationSet(animationSet);
  }, []);

  useEffect(() => {
    // Play animation
    const action =
      animations.actions[curAnimation ? curAnimation : animationSet.jumpIdle];
      

    // For jump and jump land animation, only play once and clamp when finish
    if (
      curAnimation === animationSet.jump ||
      curAnimation === animationSet.jumpLand
    ) {
      action.reset().fadeIn(0.1).setLoop(THREE.LoopOnce).play();
      action.clampWhenFinished = true;
    } else {
      action.reset().fadeIn(0.2).play();
    }

    return () => {
      if (
        curAnimation === animationSet.jump ||
        curAnimation === animationSet.jumpLand
      ) {
        action.fadeOut(0.1);
      } else {
        action.fadeOut(0.2);
      }
    };
  }, [curAnimation]);

  return (
    <Suspense fallback={<capsuleGeometry args={[0.4, 0.7]} />}>
      <primitive
        object={character.scene}
        scale={0.03}
        rotation={[0, Math.PI, 0]}
        position={[0, -0.9, 0]}
      />
    </Suspense>
  );
}
