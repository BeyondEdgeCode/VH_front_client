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
    if (e > 0 && e - 1 != 0) {
        return e - 1;
    } else {
        return e;
    }
};

export const hasInStore = (key: string): boolean => !!localStorage.getItem(key);

export const getFromStore = (key: string) =>
    JSON.parse(`${localStorage.getItem(key)}`);

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

interface Response {
    status: number;
    msg: string;
}

interface ErrorResponse {
    error: number;
    msg: string;
}

export const isResponse = <A extends any>(
    data: A | Response | null
): data is Response => {
    if (data === null) {
        return false;
    }
    return (
        (data as Response).status !== undefined &&
        (data as Response).msg !== undefined
    );
};

export const isErrorResponse = <A extends any>(
    data: A | ErrorResponse
): data is ErrorResponse => {
    return (
        (data as ErrorResponse).error !== undefined &&
        (data as ErrorResponse).msg !== undefined
    );
};

export const logout = () => {
    localStorage.clear();
    location.assign(location.origin);
    console.log(location.origin + '/profile');
};

export const isMobilePhone = (str: string) => {
    const regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return regex.test(str);
};
