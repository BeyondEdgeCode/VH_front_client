import { BehaviorSubject } from 'rxjs'
import { createSetterStore } from '../../utilsFunctions/utils'

const userAuthKey$ = new BehaviorSubject<string | null>(null)
export const setNewUserAuthKey = createSetterStore(userAuthKey$)

export const UserAuthKeyData$ = userAuthKey$.asObservable()
