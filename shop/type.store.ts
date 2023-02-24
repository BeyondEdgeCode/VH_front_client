import { BehaviorSubject } from 'rxjs'

export type Theme = Array<string>

export type FilterState = {
    // value: string
    // state: unknown
    [key: string]: string
}

export type Filter = {
    // type: string
    // key?: string
    // value: Array<FilterState>

    id: number
    key: string
    type: 'checkbox' | 'togle' | 'price' | 'selectbox'
    values: {
        [key: string]: string
    }
}

export type TempFilter = {
    type: string
    key?: string
    value: Array<FilterState>
    store$: BehaviorSubject<Array<FilterState>>
}

export type Category = {
    id: number
    subcategories: Array<{ id: number; title: string }>
    title: string
}

export interface HomeProps {
    category: Array<Category>
}

export interface Product {
    available: Array<{
        amount: number
        shop: {
            id: number
            title: string
        }
    }>
    description: string
    id: number
    image_link: string
    price: number
    specifications: string
    title: string
}

export interface MainSwiper {
    active: boolean
    id: number
    image_id: number
    image_link: string
}

export type BaseSwiperProp = {
    imgs: Array<MainSwiper>
}

export type ProductDescriptionProp = {
    description: string
    characteristics: Array<{
        title: string
        text: string
    }>
}

export interface RatingProps {
    theme?: Theme
    rating: number
}

export interface Auth {
    access_token: string
    refresh_token: string
}
