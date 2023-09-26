import React from 'react';

const Grass = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

export default Grass;
