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
    dpr={[0.5, 1.1]}
    camera={{
      fov: 60,
      near: 0.1,
      far: 1000,
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
