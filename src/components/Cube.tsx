import { useBox } from "@react-three/cannon";
import { memo, useState } from "react";
import * as textures from "../img/textures";
import { useStore } from "../store/useStore";

interface ICube {
  position: [number, number, number];
  texture: string;
}

const Cube = ({ position, texture }: ICube) => {
  const [ref] = useBox<any>(() => ({
    type: "Static",
    position,
  }));

  const allTextures: any = textures;

  const currentTexture = texture + "Texture";

  const activeTexture = allTextures[currentTexture];

  const [isHovered, setIsHovered] = useState<Boolean>(false);

  const [addCube, removeCube] = useStore((prev: any) => [
    prev.addCube,
    prev.removeCube,
  ]);

  const handleFaceClick = (
    x: number,
    y: number,
    z: number,
    faceIndex: number
  ) => {
    if (faceIndex === 1) {
      addCube(x - 1, y, z);
      return;
    }
    if (faceIndex === 3) {
      addCube(x, y - 1, z);
      return;
    }
    if (faceIndex === 5) {
      addCube(x, y, z - 1);
      return;
    }
    addCube(x, y, z);
    return;
  };
  return (
    <mesh
      ref={ref}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e: any) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e: any) => {
        e.stopPropagation();
        const faceIndex = Math.floor(e.faceIndex / 2);
        const [x, y, z] = [
          Math.round(e.point.x),
          Math.round(e.point.y),
          Math.round(e.point.z),
        ];
        if (e.altKey) {
          const [xc, yc, zc] = ref.current.position;
          removeCube(xc, yc, zc);
          return;
        }
        handleFaceClick(x, y, z, faceIndex);
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        map={activeTexture}
        color={isHovered ? "gray" : "white"}
        attach="material"
        transparent={true}
        opacity={texture === "glass" ? 0.5 : 1}
      />
    </mesh>
  );
};

function equalProps(prevProps: any, nextProps: any) {
  const equalPosition =
    prevProps.position.x === nextProps.position.x &&
    prevProps.position.y === nextProps.position.y &&
    prevProps.position.z === nextProps.position.z;

  return equalPosition && prevProps.texture === nextProps.texture;
}

export default memo(Cube, equalProps);
