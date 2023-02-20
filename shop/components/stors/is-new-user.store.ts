import { BehaviorSubject } from 'rxjs'
import { createSetterStore } from '../../utilsFunctions/utils'

const isNewUserBehevior$ = new BehaviorSubject(true)
export const setNewUserObserver = createSetterStore(isNewUserBehevior$)

export const isNewUser$ = isNewUserBehevior$.asObservable()
