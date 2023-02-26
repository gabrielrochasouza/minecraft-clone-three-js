import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useKeyBoard from "../hooks/useKeyBoard";

const JUMP_FORCE = 2;

const Player = () => {
  const actions = useKeyBoard();
  const { camera } = useThree();
  const [ref, api] = useSphere<any>(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  const pos = useRef([0, 0, 0]);
  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    if (actions.jump) {
      api.velocity.set(
        vel.current[0],
        vel.current[1] + JUMP_FORCE,
        vel.current[2]
      );
    }
  });

  return <mesh ref={ref}></mesh>;
};

export default Player;
