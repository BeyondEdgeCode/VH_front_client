import { BehaviorSubject } from "rxjs";

const isNewUserBehevior$ = new BehaviorSubject(true);
export const setNewUserObserver = (a: boolean) => {
    isNewUserBehevior$.next(a);
}

export const isNewUser$ = isNewUserBehevior$.asObservable();