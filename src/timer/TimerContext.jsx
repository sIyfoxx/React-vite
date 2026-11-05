import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext(null);

export function TimerProvider({children}){
    const [second, setSecond] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() =>{
        if(!isRunning) return;

        const id =  setInterval(() => setSecond(s => Math.max(0, s - 1)), 1000);
        return () => clearInterval(id);
    }, [isRunning])

    useEffect(() => {
        if(isRunning && second === 0) setIsRunning(false);

    }, [isRunning, second])

    return (
        <TimerContext.Provider 
        value={{second, setSecond, isRunning, setIsRunning}}>
            {children}
        </TimerContext.Provider>
    );
}

export const useTimer =  () => useContext(TimerContext);