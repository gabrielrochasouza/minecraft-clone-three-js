import { useStore } from "../store/useStore";
import Cube from "./Cube";

const Cubes = () => {
  const [cubes] = useStore((state: any) => [state.cubes]);
  return (
    <>
      {cubes.map(({ key, position, texture }: any) => (
        <Cube key={key} position={position} texture={texture} />
      ))}
    </>
  );
};

export default Cubes;
