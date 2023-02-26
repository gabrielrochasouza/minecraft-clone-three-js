import { useCallback, useEffect, useState } from 'react';

interface IKeyEventMap {
    KeyW: string | any,
    KeyS: string | any,
    KeyD: string | any,
    KeyA: string | any,
    Digit1: string | any,
    Digit2:string | any,
    Digit3:string | any,
    Digit4:string | any,
    Space: string | any,
}

interface IActions {
    moveForward: boolean,
    moveBackwards: boolean,
    moveLeft: boolean,
    moveRight: boolean,
    jump: boolean,
    texture1: boolean,
    texture2: boolean,
    texture3: boolean,
    texture4: boolean,
}

const defaultActions = {
    moveForward: false,
    moveBackwards: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    texture1: false,
    texture2: false,
    texture3: false,
    texture4: false,
}

const useKeyBoard = () => {
    const keyEventsActionMap: any = {
        KeyW: 'moveFoward',
        KeyS: 'moveBackward',
        KeyD: 'moveRight',
        KeyA: 'moveLeft',
        Digit1: 'texture1',
        Digit2: 'texture2',
        Digit3: 'texture3',
        Digit4: 'texture4',
        Space: 'jump',
    }

    const [actions, setActions] = useState<IActions>({
        moveForward: false,
        moveBackwards: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        texture1: false,
        texture2: false,
        texture3: false,
        texture4: false,
    });
    const handleKeyDownEvent = useCallback((e: any)=> {
        const action = keyEventsActionMap[e.code];
        console.log(action);554345
        if (action) {
            setActions((prev: IActions)=> {
                const newActionsObject: any = {
                    ...prev
                }
                newActionsObject[action] = true;
                return newActionsObject;
            })
        }
    },[]);
    const handleKeyUpEvent = useCallback((e: any)=> {
        setActions(defaultActions);
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