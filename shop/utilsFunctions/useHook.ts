/* eslint-disable react-hooks/rules-of-hooks */
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { setNewUserObserver } from '../components/stors/is-new-user.store'
import { UserAuthKeyData$ } from '../components/stors/user-auth.store'

export const useMergeState = <A>(init: A): [A, (chenge: A) => void] => {
    const [state, setStete] = useState(init)
    const setChenges = (chenge: A) => {
        setStete((a) => ({
            ...a,
            ...chenge,
        }))
    }
    return [state, setChenges]
}

export const useObservable = <T>(
    fa: Observable<T>,
    initial?: T
): T | undefined => {
    const [value, setValue] = useState(initial)
    useEffect(() => {
        const subscription = fa.subscribe(setValue)
        return () => subscription.unsubscribe()
    }, [fa, setValue])

    return value
}

// проверка был ли пользователь на сайте до этого
export const useCookieisNewUser = () => {
    const cookies = parseCookies()

    useEffect(() => {
        if (cookies['isNewUser']) {
            setNewUserObserver(true)
        } else {
            setNewUserObserver(false)
        }
    }, [cookies])
}

export const useSetIsNewUserCookie = (cookie: { [key: string]: string }) => {
    setCookie(cookie, 'isNewUser', 'false')
}

export const useDirtySetBodyScroll = (visible: boolean) => {
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'auto'
        } else {
            document.body.style.overflow = 'hidden'
        }
    }, [visible])
}

export const getLocalStorage = (key: string) => {
    const [s, Us] = useState<string | null>(null)
    useEffect(() => {
        Us(localStorage.getItem(key))
    }, [])
    return s
}

export const setLocalStorage = (key: string, item: string) => {
    localStorage.setItem(key, item)
}

export const useJWT = () => {
    const aT = useObservable(UserAuthKeyData$)
    return aT
}

export const useToggler = (): [boolean, () => void] => {
    const [t, sT] = useState<boolean>(false)
    const newST = () => sT((t) => !t)
    return [t, newST]
}
