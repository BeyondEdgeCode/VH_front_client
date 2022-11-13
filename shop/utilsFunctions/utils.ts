import { BehaviorSubject } from "rxjs";
import { getCategory } from "./GetFromAPI";
import { getLocalStorage } from "./useHook";

export const createSetterStore =  <A>(store$: BehaviorSubject<A>) => (newValue: A) => store$.next(newValue);

export const getFormatFilters = (el: any) => Object.entries(el).map(([value, state]) => {
    return {
        value: value,
        state: state
    }
});

export const disableNegative = (e: number) => {
    if(e>0 && e-1 != -1) {
        return e - 1;
    } else {
        return e
    }
}

export const hasInStore = (key: string): boolean => !!localStorage.getItem(key);

export const getFromStore = (key: string) => JSON.parse(`${localStorage.getItem(key)}`);

// export const getCategoryWithCash = async () => hasInStore('category') ? getFromStore('category') : await getCategory();