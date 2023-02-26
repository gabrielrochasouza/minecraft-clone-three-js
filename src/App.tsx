import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Canvas>
        <Sky />
      </Canvas>
    </>
  );
}

export default App;
