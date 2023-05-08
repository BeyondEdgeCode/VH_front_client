import { isMobilePhone } from '../../utilsFunctions/utils';

export interface ChangePersonForm {
    // email: string;
    firstName: string;
    lastName: string;
    mobilephone: string;
    birthday: string;
    city: string;
    street: string;
    building: string;
    flat: string;
    zipcode: string;
    notificationsAgree: boolean;
}

export interface ErrorChangePersonForm {
    mobilephone: boolean;
    birthday: boolean;
    city: boolean;
    street: boolean;
    building: boolean;
    flat: boolean;
    zipcode: boolean;
}

export const validateForm = (
    formState: ChangePersonForm
): ErrorChangePersonForm => {
    const state = {
        mobilephone: false,
        birthday: false,
        city: false,
        street: false,
        building: false,
        flat: false,
        zipcode: false,
    };
    for (const key in formState) {
        //@ts-ignore
        if (formState[key].length < 1) {
            //@ts-ignore
            state[key] = true;
        }
        if (key === 'mobilephone') {
            state[key] = !isMobilePhone(formState.mobilephone);
        }
    }
    return state;
};

export const formatData = (
    formState: ChangePersonForm
): Partial<ChangePersonForm> => {
    const state = {};
    for (const key in formState) {
        //@ts-ignore
        if (formState[key].length > 0) {
            //@ts-ignore
            state[key] = formState[key];
        }
    }
    return state;
};
