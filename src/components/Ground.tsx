import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { grassTexture } from "../img/textures";
import { useStore } from "../store/useStore";

const Ground = () => {
  const [ref] = usePlane<any>(() => ({
    rotation: [-0.5 * Math.PI, 0, 0],
    position: [0, -0.5, 0],
  }));

  const groundSize = 200;
  grassTexture.magFilter = NearestFilter;
  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(groundSize, groundSize);

  const [addCube] = useStore((prev: any) => [prev.addCube]);

  return (
    <mesh
      onClick={(e: any) => {
        e.stopPropagation();
        const [x, y, z] = [
          Math.round(e.point.x),
          Math.round(e.point.y),
          Math.round(e.point.z),
        ];
        addCube(x, y, z);
      }}
      ref={ref}
    >
      <planeBufferGeometry attach="geometry" args={[groundSize, groundSize]} />
      <meshStandardMaterial attach="material" map={grassTexture} />
    </mesh>
  );
};

export default Ground;
