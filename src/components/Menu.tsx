import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

const Menu = () => {
  const [saveWorld, resetWorld] = useStore((prev: any) => [
    prev.saveWorld,
    prev.resetWorld,
  ]);
  const [showCommands, setShowCommands] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCommands(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showCommands]);
  return (
    <>
      <div className="menu">
        <button onClick={() => saveWorld()}>Salvar</button>
        <button onClick={() => resetWorld()}>Resetar</button>
        <button onClick={() => setShowCommands(true)}>Comandos</button>
      </div>
      {showCommands && (
        <div className="commands">
          <h2>Commands:</h2>
          <ul>
            <li>
              <i> w </i> - Move Forward;
            </li>
            <li>
              <i> s </i> - Move Backwards;
            </li>
            <li>
              <i> d </i> - Move Right;
            </li>
            <li>
              <i> a </i> - Move Left;
            </li>
            <li>
              <i> 1 </i> - Select Material dirt;
            </li>
            <li>
              <i> 2 </i> - Select Material glass;
            </li>
            <li>
              <i> 3 </i> - Select Material grass;
            </li>
            <li>
              <i> 4 </i> - Select Material log;
            </li>
            <li>
              <i> 5 </i> - Select Material wood;
            </li>
            <li>
              <i> Space </i> - Jump;
            </li>
            <li>
              <i> Click </i> - Add Cube;
            </li>
            <li>
              <i> Alt + Click </i> - Remove Cube;
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;
