import { useCallback, useEffect, useState } from 'react';

interface IActions {
    moveForward: boolean,
    moveBackwards: boolean,
    moveLeft: boolean,
    moveRight: boolean,
    jump: boolean,
    dirt: boolean,
    glass: boolean,
    grass: boolean,
    log: boolean,
    wood: boolean,
}

const useKeyBoard = () => {
    const keyEventsActionMap: any = {
        KeyW: 'moveForward',
        KeyS: 'moveBackwards',
        KeyD: 'moveRight',
        KeyA: 'moveLeft',
        Digit1: 'dirt',
        Digit2: 'glass',
        Digit3: 'grass',
        Digit4: 'log',
        Digit5: 'wood',
        Space: 'jump',
    }
    const [actions, setActions] = useState<IActions>({
        moveForward: false,
        moveBackwards: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        glass: false,
        grass: false,
        log: false,
        wood: false,
    });
    const handleKeyDownEvent = useCallback((e: KeyboardEvent)=> {
        const action = keyEventsActionMap[e.code];
        if (action === 'jump' && e.repeat) return;
        if (action) {
            setActions((prev) => {
                return {
                    ...prev,
                    [action]: true,
                }
            })
        }
    },[]);
    const handleKeyUpEvent = useCallback((e: KeyboardEvent)=> {
        const action = keyEventsActionMap[e.code];
        if (action) {
            setActions((prev) => {
                return {
                    ...prev,
                    [action]: false,
                }
            })
        }
    },[]);

    useEffect(()=> {
        document.addEventListener('keydown', handleKeyDownEvent);
        document.addEventListener('keyup', handleKeyUpEvent);
        return ()=> {
            document.removeEventListener('keydown', handleKeyDownEvent);
            document.removeEventListener('keyup', handleKeyUpEvent);
        }
    }, [handleKeyDownEvent, handleKeyUpEvent]);
    
    return actions;
};
export default useKeyBoard;
