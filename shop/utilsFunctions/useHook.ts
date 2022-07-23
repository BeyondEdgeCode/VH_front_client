import { useState } from "react"

export const useMergeState = <A>(init:A): [A, (chenge: A) => void] => {
    const [state, setStete] = useState(init);
    const setChenges = (chenge: A) => {
        setStete(a => ({...a, ...chenge}));
    };
    return [state, setChenges];
}