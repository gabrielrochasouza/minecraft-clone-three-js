import { useStore } from "../store/useStore";

const Menu = () => {
  const [saveWorld, resetWorld] = useStore((prev: any) => [
    prev.saveWorld,
    prev.resetWorld,
  ]);
  return (
    <div className="menu">
      <button onClick={() => saveWorld()}>Salvar</button>
      <button onClick={() => resetWorld()}>Resetar</button>
    </div>
  );
};

export default Menu;
