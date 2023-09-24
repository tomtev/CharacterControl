import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
  <Leva collapsed/>
  <Canvas
    shadows
    dpr={[0.5, 1]}
    camera={{
      fov: 70,
      near: 0.02,
      far: 500,
      position: [0, 0, 0],
    }}
    onPointerDown={(e) => {
      e.target.requestPointerLock();
    }}
  >
    <Experience />
  </Canvas>
  </>
);
