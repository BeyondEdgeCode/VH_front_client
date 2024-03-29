import axios, { AxiosError, Method } from 'axios';
import { API } from '../components/API';
import { StorData } from '../components/filters/filter-collector/filter-collector';
import { ChangePersonForm } from '../components/form/form.model';
import { setNewUserAuthKey } from '../components/stors/user-auth.store';
import {
    BasketData,
    Category,
    MainSwiper,
    Orders,
    Product,
    ProductFilter,
    ResponsePromo,
    Reviews,
} from '../type.store';
import { setLocalStorage } from './useHook';
import {
    errorToast,
    isErrorResponse,
    isResponse,
    logout,
    successToast,
} from './utils';

export const getCategory = async () => {
    const res = await axios.get<Array<Category>>(API.getCategory);
    const category = await res.data;

    return category;
};

export const getProductsById = async (id: number, isSub: boolean = false) => {
    if (isSub) {
        const res = await axios.get<Array<Product>>(
            API.getProductsBySubcategoryId + `${id}`
        );
        const products = await res.data;
        return products;
    } else {
        const res = await axios.get<Array<Product>>(
            API.getProductsById + `${id}`
        );
        const products = await res.data;
        return products;
    }
};

export const getProductById = async (id: number) => {
    const res = await axios.get<Product>(API.getProductById + `${id}`);
    const product = await res.data;
    return product;
};

export const getMainSwiper = async () => {
    const res = await axios.get<Array<MainSwiper>>(API.getMainSwiper);
    const MainSwiper = await res.data;

    return MainSwiper;
};

export const getLatestProduct = async () => {
    const res = await axios.get<Array<Product>>(API.getLatestProduct);
    const products = await res.data;
    return products;
};

export const getCategoryFilterById = async (id: number) => {
    const res = await axios.get<ProductFilter[]>(
        API.getCategoryFilterById + `${id}`
    );
    const filters = await res.data;
    return filters;
};

export const getSubCategoryFilterById = async (id: number) => {
    const res = await axios.get<ProductFilter[]>(
        API.getSubCategoryFilterById + `${id}`
    );
    const filters = await res.data;
    return filters;
};

interface Auth {
    email: string;
    password: string;
}

export const auth = async (data: Auth, cb: () => void) => {
    try {
        const options = {
            method: 'POST' as Method,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data,
            url: API.auth,
            origin: API,
        };
        const res = await axios.post<any>(API.auth, data, options);

        const access_token = await res.data;

        setNewUserAuthKey(access_token.access_token);
        setLocalStorage('JWT', access_token.access_token);
        //@ts-ignore
    } catch (error: AxiosError) {
        if (
            (error.response && error.response.status === 400) ||
            (error.response && error.response.status === 401)
        ) {
            errorToast('Что то пошло не так');
            cb();
        }
    }
};
export interface getProductsByFiltersAplyedArguments {
    filters: StorData[];
    category_id?: number;
    subcategory_id?: number;
    max?: number;
    min?: number;
    available?: number;
}
export const getProductsByFiltersAplyed = async (
    args: getProductsByFiltersAplyedArguments,
    isSub?: boolean
) => {
    const options = {
        method: 'POST' as Method,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        origin: API.base,
    };
    const res = await axios.post<Array<Product>>(
        !isSub
            ? API.getProductsByFiltersAplyed
            : API.getSubProductsByFiltersAplyed,
        {
            ...args,
        },
        options
    );
    const data = await res.data;

    return data;
};

interface Response {
    status: number;
    msg: string;
}

const OPTIONS = (jwt?: string | null, method: Method = 'POST') => ({
    method: method,
    headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + jwt,
    },
    origin: API.base,
});

export const addProductToFavorite = async (id: number, jwt?: string) => {
    try {
        const res = await axios.post<Response>(
            API.addProductToFavorite,
            { product_fk: id },
            { ...OPTIONS(jwt) }
        );

        switch (res.data.status) {
            case 200:
                successToast('Успешно добавлен');
                break;
            case 400:
                errorToast('Уже в избранном!');
                break;
            default:
                errorToast('Что-то пошло не так!');
                break;
        }
    } catch (error) {
        errorToast('Что-то пошло не так!');
    }
};

export const remoweProductFromFavorite = async (id: number, jwt?: string) => {
    try {
        const res = await axios.delete(
            API.removeProductFavorite + id,
            OPTIONS(jwt)
        );

        switch (res.data.status) {
            case 200:
                successToast(res.data.msg);
                return true;
            default:
                errorToast('Что-то пошло не так!');
                return false;
        }
    } catch (error) {
        errorToast('Что-то пошло не так!');
    }
};

export const getFavorite = async (jwt?: string) => {
    const res = await axios.get<Array<{ id: number; product: Product }>>(
        API.getFavorite,
        OPTIONS(jwt)
    );
    const favorite = await res.data;

    return favorite;
};

export const getReviews = async (id: number) => {
    const res = await axios.get<Array<Reviews>>(API.getReviews + id);
    const reviews = await res.data;

    return reviews;
};

export const addToBasket = async (id: number, jwt: string) => {
    try {
        const res = await axios.post<Response>(
            API.addToBasket,
            { product_id: id },
            { ...OPTIONS(jwt) }
        );

        switch (res.data.status) {
            case 200:
                successToast('Успешно добавлен');
                break;
            default:
                errorToast('Что-то пошло не так!');
                break;
        }
    } catch (error) {
        errorToast('Что-то пошло не так!');
    }
};

export const getBasket = async (jwt: string) => {
    try {
        const res = await axios.get<BasketData>(API.getBasket, OPTIONS(jwt));
        const basket = await res.data;
        return basket;
        //@ts-ignore
    } catch (error: AxiosError) {
        if (error.response && error.response.status === 403) {
            logout();
        }
    }
};

export const incBasket = async (id: number, jwt: string, cb?: () => void) => {
    try {
        const res = await axios.patch(API.incBasket, { id }, OPTIONS(jwt));
        switch (res.data.status) {
            case 200:
                cb && cb();
                successToast('Количество товара изменилось');
                break;
            case 400:
                errorToast('Товара неосталось на складе');
                break;
            default:
                break;
        }
    } catch (error) {
        errorToast('Что-то пошло не так!');
    }
};

export const decBasket = async (id: number, jwt: string, cb?: () => void) => {
    try {
        const res = await axios.patch(API.decBasket, { id }, OPTIONS(jwt));
        switch (res.data.status) {
            case 200:
                cb && cb();
                successToast('Количество товара изменилось');
                break;
            case 400:
                errorToast('Товара неосталось на складе');
                break;
            default:
                break;
        }
    } catch (error) {
        errorToast('Что-то пошло не так!');
    }
};

export const getShops = async () => {
    const res = await axios.get(API.getSops);
    const shops = await res.data;
    return shops;
};

export const deleteProductFromBusket = async (id: number, jwt: string) => {
    try {
        const res = await axios.delete(API.delFromBasket + id, OPTIONS(jwt));
        switch (res.data.status) {
            case 200:
                successToast('Товар Успешно удалён');
                break;
            case 400:
                errorToast('Что-то пошло не так!');
                break;
            default:
                break;
        }
    } catch (error) {
        errorToast('Что-то пошло не так!');
    }
};

export const checkPromo = async (promo: string, jwt: string) => {
    try {
        const res = await axios.post<ResponsePromo | Response>(
            API.promoCheck,
            {
                promocode: promo,
            },
            OPTIONS(jwt)
        );

        if (isErrorResponse(res.data) && res.data.error === 400) {
            errorToast(res.data.msg);
            console.log('F');

            return null;
        }
        if (isResponse(res.data) && res.data.status === 404) {
            errorToast('Промокод не активен');
            return null;
        }

        return await res.data;
    } catch {
        errorToast('Что-то пошло не так!');
    }
};
export interface ConfirmOrderData {
    promocode?: string;
    shop_id: number;
}
export const confirmOrder = async (data: ConfirmOrderData, jwt: string) => {
    try {
        const res = await axios.post<Response>(
            API.createOrder,
            data,
            OPTIONS(jwt)
        );
        if (res.data.status === 200) {
            successToast(res.data.msg);
        }
        //@ts-ignore
    } catch (error: AxiosError) {
        if (error.response && error.response.status === 403) {
            errorToast('Что то пошло не так');
        }
    }
};

export const setUserData = async (
    data: Partial<ChangePersonForm>,
    jwt: string | null
) => {
    try {
        const res = await axios.patch<Response>(
            API.setUserData,
            {
                ...data,
                //@ts-ignore
                birthday: new Date(data?.birthday).toISOString(),
            },
            OPTIONS(jwt, 'PATCH')
        );
        if (res.data.status === 200) {
            successToast(res.data.msg);
        }
        //@ts-ignore
    } catch (error: AxiosError) {
        if (error.response && error.response.status === 403) {
            errorToast('Что то пошло не так');
        }
    }
};

export const getOrder = async (jwt: string) => {
    try {
        const res = await axios.get<Array<Orders>>(API.getOrder, OPTIONS(jwt));
        const orders = await res.data;
        return orders;
        //@ts-ignore
    } catch (error: AxiosError) {
        if (error.response && error.response.status === 403) {
            logout();
        }
        return [];
    }
};

export const cancelOrder = async (jwt: string, id: number, cb: Function) => {
    try {
        const res = await axios.delete<Response>(
            API.cancelOrder + id,
            OPTIONS(jwt, 'DELETE')
        );
        if (res.data.status === 200) {
            successToast(res.data.msg);
            cb();
        }
        //@ts-ignore
    } catch (error: AxiosError) {
        errorToast('Что то пошло не так');
    }
};
