import axios from 'axios';
import { API } from '../components/API';


export type Category = {
    id: number,
    subcategories: Array<{id: number, title: string}>,
    title: string
}

export const getCategory = async () => {
    const res = await axios.get<Array<Category>>(API.getCategory);
    const category =  await res.data;
    return category;
    // return [{id:1, subcategories: [], title: 'qwe'}];
}