import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import { grassImg } from "../img";
import { useStore } from "../store/useStore";

const Ground = () => {
  const [ref] = usePlane<any>(() => ({
    rotation: [-0.5 * Math.PI, 0, 0],
    position: [0, -0.5, 0],
  }));

  const groundTexture = new TextureLoader().load(grassImg);

  const groundSize = 200;
  groundTexture.magFilter = NearestFilter;
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(groundSize, groundSize);

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
      <planeGeometry attach="geometry" args={[groundSize, groundSize]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
