/* eslint-disable react-hooks/rules-of-hooks */
import { StatemanjsAPI, StatemanjsComputedAPI } from '@persevie/statemanjs';
import { parseCookies, setCookie } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { setNewUserObserver } from '../components/stors/is-new-user.store';
import { UserAuthKeyData$ } from '../components/stors/user-auth.store';

export const useMergeState = <A>(init: A): [A, (chenge: A) => void] => {
    const [state, setStete] = useState(init);
    const setChenges = (chenge: A) => {
        setStete((a) => ({
            ...a,
            ...chenge,
        }));
    };
    return [state, setChenges];
};

export const useObservable = <T>(
    fa: Observable<T>,
    initial?: T
): T | undefined => {
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
        if (cookies['isNewUser']) {
            setNewUserObserver(true);
        } else {
            setNewUserObserver(false);
        }
    }, [cookies]);
};

export const useSetIsNewUserCookie = (cookie: { [key: string]: string }) => {
    setCookie(cookie, 'isNewUser', 'false');
};

export const useDirtySetBodyScroll = (visible: boolean) => {
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [visible]);
};

export const getLocalStorage = (key: string) => {
    const [s, Us] = useState<string | null>(null);
    useEffect(() => {
        Us(localStorage.getItem(key));
    }, []);
    return s;
};

export const setLocalStorage = (key: string, item: string) => {
    localStorage.setItem(key, item);
};

export const useJWT = () => {
    const aT = useObservable(UserAuthKeyData$);
    return aT;
};

export const useJWT_2 = () => {
    const [jwt, setJwt] = useState<string | null>(null);
    useEffect(() => {
        setJwt(localStorage.getItem('JWT') ?? null);
    }, []);

    return jwt;
};

export const useToggler = (
    init = false
): [boolean, () => void, (s: boolean) => void] => {
    const [t, sT] = useState<boolean>(init);
    const newST = () => sT((t) => !t);
    return [t, newST, sT];
};

type UnknownVMStreams = {
    [key: string]: Observable<unknown>;
};

export interface unknownVM<T> {
    values: T;
    observers: UnknownVMStreams;
}
export const runVM = <A>(data: unknownVM<A>): A => {
    Object.values(data.observers).forEach((o) => {
        useObservable(o);
    });
    return data.values as A;
};

export const fromProperty = <T>(
    poperty: StatemanjsAPI<T> | StatemanjsComputedAPI<T>
) => {
    const [state, setStete] = useState<T>(() => poperty.get());

    useEffect(() => {
        poperty.subscribe(setStete);
        return () => poperty.unsubscribeAll();
    }, [poperty]);

    return state;
};
