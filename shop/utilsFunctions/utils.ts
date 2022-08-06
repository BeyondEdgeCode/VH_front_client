import { BehaviorSubject } from "rxjs";

export const createSetterStore =  <A>(store$: BehaviorSubject<A>) => (newValue: A) => store$.next(newValue);

export const getFormatFilters = (el: any) => Object.entries(el).map(([value, state]) => {
    return {
        value: value,
        state: state
    }
});