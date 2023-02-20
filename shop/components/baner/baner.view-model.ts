import {
    useObservable,
    useSetIsNewUserCookie,
} from '../../utilsFunctions/useHook'
import { isNewUser$, setNewUserObserver } from '../stors/is-new-user.store'

export interface Baner {
    visible: boolean
    agree: () => void
    disagree: () => void
}

type NewBaner = () => Baner

export const newBanerViewModel: NewBaner = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const visible = useObservable(isNewUser$) ?? true
    const agree = () => {
        setNewUserObserver(true)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSetIsNewUserCookie({ cookie: 'true' })
    }

    const disagree = () => {
        window.history.back()
    }

    return {
        visible,
        agree,
        disagree,
    }
}
