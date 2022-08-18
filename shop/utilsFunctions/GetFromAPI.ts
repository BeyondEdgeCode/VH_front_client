import axios from 'axios';
import { GET_CATEGORY } from '../components/API';


export type Category = {
    id: number,
    subcategories: Array<{id: number, title: string}>,
    title: string
}

export const getCategory = async () => {
    const res = await axios.get<Array<Category>>(GET_CATEGORY)
    const category =  await res.data;
    return category;
}