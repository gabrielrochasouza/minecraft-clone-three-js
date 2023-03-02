import { create } from 'zustand';
import { nanoid } from 'nanoid';

const getCubesFromLocalStorage = () => {
    const localStorageCubes = window.localStorage.getItem('@Cubes');
    if (localStorageCubes) {
        return JSON.parse(localStorageCubes);
    }
    return [];
}

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: getCubesFromLocalStorage(),
    addCube: (x: number,y: number,z: number) => {
        set((prev: any)=> {
            y = y <= 0 ? 0 : y
            if(!prev.cubes.some((cube: any) => cube.position.x === x && cube.position.y === y && cube.position.z === z)){
                return {
                    cubes: [
                        ...prev.cubes,
                        {
                            key: nanoid(),
                            position: [x, y, z],
                            texture: prev.texture,
                        }
                    ]
                }
            }
            return prev.cubes;
        }) 
    },
    removeCube: (x: number,y: number,z: number) => {
        set((prev: any)=> ({
            cubes: prev.cubes.filter((cube: any) => cube.position[0] !== x || cube.position[1] !== y || cube.position[2] !== z)
        })) 
    },
    setTexture: (texture: string) => {
        set(()=> ({
            texture
        }))
    },
    saveWorld: () => {
        set((prev:any) => {
            window.localStorage.setItem('@Cubes', JSON.stringify(prev.cubes));
            return {
                cubes: prev.cubes,
            }
        })
    },
    resetWorld: () => {
        set(()=>({
            cubes: [],
        }))
    },
}))
