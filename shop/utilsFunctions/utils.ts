import test from 'node:test';
import { toast } from 'react-toastify';
import { BehaviorSubject } from 'rxjs';

export const createSetterStore =
    <A>(store$: BehaviorSubject<A>) =>
    (newValue: A) => {
        store$.next(newValue);
    };

export const dinamicStore = <A>(s: A) => {
    const store$ = new BehaviorSubject<A>(s);
    return {
        store$: store$,
        setterStore: createSetterStore(store$),
    };
};

export const disableNegative = (e: number) => {
    if (e > 0 && e - 1 != -1) {
        return e - 1;
    } else {
        return e;
    }
};

export const hasInStore = (key: string): boolean => !!localStorage.getItem(key);

export const getFromStore = (key: string) =>
    JSON.parse(`${localStorage.getItem(key)}`);

// export const getCategoryWithCash = async () => hasInStore('category') ? getFromStore('category') : await getCategory();

export const ArrayFromObj = <O extends object>(o: O) => {
    return [Object.keys(o), Object.values(o)];
};

export const getPropByValue =
    <O extends Object>(object: O) =>
    (value: string) => {
        //@ts-ignore
        return Object.keys(object).find((key) => object[key] === value);
    };

export const successToast = (text: string) =>
    toast.success(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    });

export const errorToast = (text: string) =>
    toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    });
