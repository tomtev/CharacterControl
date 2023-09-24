import React, { Suspense, useRef, useState } from "react";
import { useGLTF, useIntersect, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, vec3 } from "@react-three/rapier";
import * as THREE from "three";

let mapCache = {};

const GenerateMap = ({ isClose, isCurrent, ...chunk }) => {
  if (!mapCache[chunk.file]) {
    const gltf = useGLTF("/maps-25x25/" + chunk.file);
    const noCollision = [
      "Wheat",
      "Grass",
      "Double_Tallgrass",
      "Big_Dripleaf_Stem",
      "Amethyst_Cluster",
      "Tall_Seagrass",
      "Lantern",
      "Peony",
      "Brown_Mushroom",
      "Torch",
      "Allium",
      "Blue_Orchid",
      "Beehive",
      "Sunflower",
      "Seagrass",
      "Lilac",
      "Large_Fern",
      "Azure_Bluet",
      "Lily_Pad",
      "Lantern",
      "Tallgrass",
      "Dripleaf_Stem",
      "Dripleaf",
      "Dandelion",
      "Red_Mushroom",
    ];

    const noCollisionObjects = [];

    gltf.scene.traverseVisible((obj) => {
      obj.castShadow = true;
      obj.receiveShadow = true;

      if (obj.material?.map) obj.material.map.magFilter = THREE.NearestFilter;
      if (obj.material?.map)
        obj.material.map.minFilter = THREE.LinearMipMapLinearFilter;

      if (obj.material?.transparent) {
  
      }

      if (noCollision.includes(obj.name)) {
        noCollisionObjects.push(gltf.scene.getObjectByName(obj.name));
      }
    });

    noCollision.forEach((object) => {
      gltf.scene.children[0].remove(gltf.scene.getObjectByName(object));
    });

    /*/* Add to cache */
    mapCache[chunk.file] = {
      map: gltf.scene,
      noCollisionObjects: noCollisionObjects,
    };
  }

  const [isIntersecting, setIntersecting] = useState(false);
  const inView = useIntersect((entry) => {
    setIntersecting(entry);
  });

  return (
    <Suspense fallback={"loading"}>
      <group>
        {/* this is the invisible mesh that is used to check if the chunk is in view*/}
        <mesh
          ref={inView}
          position={[chunk.x, , (chunkSize * 2) / 2 - 50, chunk.z]}
          scale={(1, 1, 1)}
        >
          <boxGeometry args={[chunkSize - 5, chunkSize * 2, chunkSize - 5]} />
          <meshBasicMaterial
            opacity={0}
            color={isIntersecting && isClose ? "red" : "white"}
            transparent
          />
        </mesh>

        <Html position={[chunk.x, -40, chunk.z]}>
          {chunk.z + "_" + chunk.x}
        </Html>

        {isClose && isIntersecting && (
          <>
            {mapCache[chunk.file].noCollisionObjects.map((object, i) => (
              <primitive
                key={i}
                object={object}
                position={[chunk.x, -50, chunk.z]}
              />
            ))}
          </>
        )}

        {isIntersecting && (
          <RigidBody
            type="fixed"
            colliders={isClose && isIntersecting ? "trimesh" : false}
          >
            <primitive
              object={mapCache[chunk.file].map}
              position={[chunk.x, -50, chunk.z]}
            />
          </RigidBody>
        )}
      </group>
    </Suspense>
  );
};

const chunkSize = 25;
const startX = 50;
const startY = -50;

const minXchunk = -200;
const maxXchunk = 300;
const minYchunk = 25;
const maxYchunk = -475;

const getChunks = ({ x, z, expand = 3 }) => {
  const xPos = Math.round(x / chunkSize);
  const zPos = Math.round(z / chunkSize);

  const chunks = [];

  for (let col = xPos - expand; col <= xPos + expand; col++) {
    for (let row = zPos - expand; row <= zPos + expand; row++) {
      const xCoord = col * chunkSize;
      const zCoord = row * chunkSize;

      // Check if the chunk coordinates are within the defined bounds
      if (
        xCoord >= minXchunk &&
        xCoord <= maxXchunk &&
        zCoord >= maxYchunk &&
        zCoord <= minYchunk
      ) {
        chunks.push({
          x: xCoord,
          z: zCoord,
          file: `chunk${startX + xCoord}-${
            startY + zCoord
          }-lvl-1-transformed.glb`,
          key: col + "_" + row,
        });
      }
    }
  }
  return chunks;
};

const getChunkIds = ({ x, z, expand = 2 }) => {
  const xPos = Math.round(x / chunkSize);
  const zPos = Math.round(z / chunkSize);
  const chunks = [];
  for (let col = xPos - expand; col <= xPos + expand; col++) {
    for (let row = zPos - expand; row <= zPos + expand; row++) {
      chunks.push(col + "_" + row);
    }
  }
  return chunks;
};

export default function Map() {
  const [chunks, setChunks] = useState(getChunks({ x: 0, z: 0 }));
  const [closeChunks, setCloseChunks] = useState();
  const [currentChunk, setCurrentChunk] = useState();

  const refState = useRef({
    playerChunkPos: [1, 1],
  });

  const { scene } = useThree();

  useFrame(() => {
    try {
      const pos = scene.getObjectByName("player")?.getWorldPosition(vec3());
      if (pos) {
        const chunkPos = [
          Math.round(pos.x / chunkSize),
          Math.round(pos.z / chunkSize),
        ];
        if (
          chunkPos[0] !== refState.current.playerChunkPos[0] ||
          chunkPos[1] !== refState.current.playerChunkPos[1]
        ) {
          setChunks(getChunks({ x: pos.x, z: pos.z, expand: 3 }));
          setCloseChunks(getChunkIds({ x: pos.x, z: pos.z, expand: 1 }));
          setCurrentChunk(getChunkIds({ x: pos.x, z: pos.z, expand: 0 }));
        }
      }
    } catch (err) {}
  });

  return chunks.map((chunk) => (
    <GenerateMap
      {...chunk}
      key={chunk.key}
      iCurrent={currentChunk?.includes(chunk.key)}
      isClose={closeChunks?.includes(chunk.key)}
      isCurrent={currentChunk?.includes(chunk.key)}
    />
  ));
}
