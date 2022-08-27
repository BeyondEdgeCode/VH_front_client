import axios from 'axios';
import { API } from '../components/API';
import { Category, MainSwiper, Product } from '../type.store';




export const getCategory = async () => {
    const res = await axios.get<Array<Category>>(API.getCategory);
    const category =  await res.data;
    return category;
    // return [{id:1, subcategories: [], title: 'qwe'}];
}

export const getProductsById = async (id: number) => {
    const res = await axios.get<Array<Product>>(API.getProductsById + `${id}`);
    const products =  await res.data;
    return products;
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