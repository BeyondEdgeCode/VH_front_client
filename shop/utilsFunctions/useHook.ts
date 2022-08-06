import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react"
import { Observable } from "rxjs";
import { setNewUserObserver } from "../components/storges/is-new-user.store";

export const useMergeState = <A>(init:A): [A, (chenge: A) => void] => {
    const [state, setStete] = useState(init);
    const setChenges = (chenge: A) => {
        setStete(a => ({...a, ...chenge}));
    };
    return [state, setChenges];
}

export const useObservable = <T>(fa: Observable<T>, initial: T): T => {
    const [value, setValue] = useState(initial);
    useEffect(() => {
        const subscription = fa.subscribe(setValue);
        return () => subscription.unsubscribe();
    }, [fa, setValue]);

    return value;
};

// проверка был ли пользователь на сайте до этого 
export const useCookieisNewUser = () => {
    const cookies = parseCookies();
    
    useEffect(() => {
        if(cookies['isNewUser']) {
            setNewUserObserver(true);
        } else {
            setNewUserObserver(false);
        }
    }, [cookies])
}

export const useSetIsNewUserCookie = (cookie: {[key: string]: string}) => {
    setCookie(cookie, 'isNewUser', 'false');
}

export const useDirtySetBodyScroll = (visible: boolean) => {
    useEffect(() => {
        if(visible) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
        
    }, [visible])
}