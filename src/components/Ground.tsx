import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { grassTexture } from "../img/textures";

const Ground = () => {
  const [ref] = usePlane<any>(() => ({
    rotation: [-0.5 * Math.PI, 0, 0],
    position: [0, 0, 0],
  }));

  const groundSize = 200;
  grassTexture.magFilter = NearestFilter;
  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(groundSize, groundSize);

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[groundSize, groundSize]} />
      <meshStandardMaterial attach="material" map={grassTexture} />
    </mesh>
  );
};

export default Ground;
