import React, { useRef, useEffect } from "react";
import { Matrix4, Raycaster, Vector2, Vector3 } from "three";
import { useThree } from "@react-three/fiber";


const InstancedObjects = ({ mesh, positions }) => {
    
  const instanceMesh = useRef();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const { camera } = useThree();  // Access the camera from the Canvas context

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
    // Normalize mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(instanceMesh.current, true);
  
    if (intersects.length > 0) {
      const instanceId = intersects[0].instanceId;

      console.log(instanceId)
      const matrix = new Matrix4();
      instanceMesh.current.getMatrixAt(instanceId, matrix);
      const position = new Vector3();
      position.setFromMatrixPosition(matrix);
      
      // Add a simple upward animation (you can customize this)
      position.y += 0.1;
      matrix.setPosition(position);
      console.log(position)

      instanceMesh.current.setMatrixAt(instanceId, matrix);
      instanceMesh.current.instanceMatrix.needsUpdate = true;
    }
  };
  

  return (
    <>
      {positions && positions.length > 0 ? (
        <instancedMesh
          ref={instanceMesh}
          args={[null, null, positions.length]}
          onPointerDown={handleMouseDown}
        >
          {mesh}
        </instancedMesh>
      ) : null}
    </>
  );
};

export default InstancedObjects;
