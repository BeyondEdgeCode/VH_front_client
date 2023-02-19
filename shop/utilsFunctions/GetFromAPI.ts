import axios from 'axios';
import { parseCookies } from 'nookies';
import { API } from '../components/API';
import { setNewUserAuthKey } from '../components/stors/user-auth.store';
import { Auth, Category, Filter, MainSwiper, Product } from '../type.store';
import { setLocalStorage } from './useHook';




export const getCategory = async () => {
    const res = await axios.get<Array<Category>>(API.getCategory);
    const category =  await res.data;
    
    return category;
}


export const getProductsById = async (id: number, isSub: boolean = false) => {
    if (isSub) {
        const res = await axios.get<Array<Product>>(API.getProductsBySubcategoryId + `${id}`);
        const products =  await res.data;
        return products;
    } else {
        const res = await axios.get<Array<Product>>(API.getProductsById + `${id}`);
        const products =  await res.data;
        return products;
    }
}

export const getProductById = async (id: number) => {
        const res = await axios.get<any>(API.getProductById + `${id}`);
        const product =  await res.data;
        return product;
}

export const getMainSwiper = async () => {
    const res = await axios.get<Array<MainSwiper>>(API.getMainSwiper);
    const MainSwiper =  await res.data;
    
    return MainSwiper;
}

export const getLatestProduct = async () => {
    const res = await axios.get<Array<Product>>(API.getLatestProduct);
    const products =  await res.data;
    return products;
}

export const getCategoryFilterById = async (id: number) => {
    const res = await axios.get<Array<Filter>>(API.getCategoryFilterById + `${id}`);
    const filters =  await res.data;
    return filters;
}

export const auth = async () => {
    // TODO: Вынести в в параметры
    const data = { 
        email: 'dev@evgeniy.host',
        password: 'testpassword123',
        remember: 1,
    };
    // TODO: Вынести в функцию
    const options = {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
      data: data,
      url: API.auth,
      origin: API
    };
    const res = await axios.post<any>(API.auth, {
        email: 'dev@evgeniy.host',
        password: 'testpassword123',
        remember: 1,
    }, options);

    const access_token = await res.data;

    setNewUserAuthKey(access_token.access_token);
    setLocalStorage('JWT', access_token.access_token);
}
