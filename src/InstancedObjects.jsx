import React, { useRef, useEffect, useState } from "react";
import { Matrix4, Vector3, WebGLRenderTarget, RGBAFormat, Vector2 } from "three";

const InstancedObjects = ({ mesh, positions }) => {
  const instanceMesh = useRef();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState(new Vector2());

  useEffect(() => {
    if (positions && instanceMesh.current) {
      positions.forEach((position, index) => {
        const matrix = new Matrix4().setPosition(
          position.x,
          position.y,
          position.z
        );
        instanceMesh.current.setMatrixAt(index, matrix);
      });
      instanceMesh.current.instanceMatrix.needsUpdate = true;

      // If needed, compute the bounding sphere
      if (
        instanceMesh.current &&
        instanceMesh.current.geometry &&
        !instanceMesh.current.geometry.boundingSphere
      ) {
        instanceMesh.current.geometry.computeBoundingSphere();
      }
    }
  }, [positions]);

  const handleMouseDown = (event) => {
    console.log(event.eventObject)
    setIsMouseDown(true);
    setMousePosition(new Vector2(event.clientX, event.clientY));
    // Render the scene to your offscreen target with the special material
    // Read the color of the pixel under the mouse
    // Map that color to an instance
  };

  const handleMouseUp = (event) => {
    setIsMouseDown(false);
  };

  return (
    <>
      {positions && positions.length > 0 ? (
        <instancedMesh
          ref={instanceMesh}
          args={[null, null, positions.length]}
          onPointerDown={handleMouseDown}
          onPointerUp={handleMouseUp}
        >
          {mesh}
        </instancedMesh>
      ) : null}
    </>
  );
};

export default InstancedObjects;
