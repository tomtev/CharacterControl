import { Grid, KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import CharacterController from "./CharacterController.jsx";
import Floor from "../example/Floor.jsx";
import Lights from "../example/Lights.jsx";
import Slopes from "../example/Slopes.jsx";
import RoughPlane from "../example/RoughPlane.jsx";

import { useControls } from "leva";
import CharacterModel from "./CharacterModel.jsx";

export default function Experience() {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "triggle", keys: ["KeyF"] },
  ];

  return (
    <>
      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
      />

      <Lights />

      <Physics debug={physics} timeStep="vary">
        {/* Keyboard preset */}
        <KeyboardControls map={keyboardMap}>
          {/* Character Control */}
          <CharacterController>
            <CharacterModel />
          </CharacterController>
        </KeyboardControls>

        <RoughPlane />

        <Slopes />


        <Floor />

      </Physics>
    </>
  );
}
