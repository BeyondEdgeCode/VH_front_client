/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'

export const useCurrentPathname = () => {
    const r = useRouter()
    return r.asPath.split('/')[r.asPath.split('/').length - 1]
}

export const useHasRoute = (r: string) => {
    const route = useRouter()
    return route.asPath.split('/').includes(r)
}

export const isBasket = () => useCurrentPathname() === 'basket'
