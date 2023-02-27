import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import "./App.css";
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import Player from "./components/Player";
import FPV from "./components/FPV";
import Cubes from "./components/Cubes";
import Menu from "./components/Menu";
import TextureSelector from "./components/TextureSelector";

function App() {
  return (
    <>
      <Canvas style={{ width: "100%", height: "100%" }}>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.8} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <Menu />
      <TextureSelector />
      <div className="pointer-lock">+</div>
    </>
  );
}

export default App;
