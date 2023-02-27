import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useKeyBoard from "../hooks/useKeyBoard";

interface IActions {
  moveForward: boolean;
  moveBackwards: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  jump: boolean;
}

const JUMP_FORCE = 4;
const WALKING_VELOCITY = 5;

const Player = () => {
  const { jump, moveBackwards, moveForward, moveLeft, moveRight }: IActions =
    useKeyBoard();

  const { camera } = useThree();

  const [ref, api] = useSphere<any>(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1.2, 0],
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

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackwards ? 1 : 0) - (moveForward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(WALKING_VELOCITY)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.01) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};

export default Player;
