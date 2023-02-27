import { useEffect, useState } from "react";
import useKeyBoard from "../hooks/useKeyBoard";
import { useStore } from "../store/useStore";
import * as texturesImg from "../img/index";

const TextureSelector = () => {
  const actions = useKeyBoard();
  const [setTexture, texture] = useStore((prev: any) => [
    prev.setTexture,
    prev.texture,
  ]);

  const [texturesVisible, setTexturesVisible] = useState<boolean>(true);

  const { dirt, glass, grass, log, wood } = actions;
  const textures: any = {
    dirt,
    glass,
    grass,
    log,
    wood,
  };

  useEffect(() => {
    const activeTexture = Object.entries(textures).find(
      ([key, value]) => value
    );
    if (activeTexture) {
      setTexture(activeTexture[0]);
    }
    const timeOut = setTimeout(() => {
      setTexturesVisible(false);
    }, 2000);
    setTexturesVisible(true);

    return () => clearTimeout(timeOut);
  }, [dirt, glass, grass, log, wood, setTexturesVisible]);

  return texturesVisible ? (
    <div className="texture-selector">
      {Object.entries(texturesImg).map(([key, value]) => (
        <img
          key={key}
          src={value}
          alt={key}
          className={texture + "Img" === key ? "selected" : ""}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default TextureSelector;
