export type Theme = Array<string>;

export type FilterValues = { [key: string]: string };

export interface ProductFilter {
    id: string;
    is_filter: boolean;
    key: string;
    type: 'toggle' | 'range' | 'selectbox' | 'checkbox';
    values: FilterValues;
}

export type Category = {
    id: number;
    subcategories: Array<{ id: number; title: string }>;
    title: string;
};

export interface HomeProps {
    category: Array<Category>;
}

export interface Product {
    available: Array<{
        amount: number;
        shop: {
            id: number;
            title: string;
        };
    }>;
    description: string;
    id: number;
    image_link: string;
    price: number;
    specifications: string;
    title: string;
}

export interface MainSwiper {
    active: boolean;
    id: number;
    image_id: number;
    image_link: string;
}

export type BaseSwiperProp = {
    imgs: Array<MainSwiper>;
};

export type ProductDescriptionProp = {
    description: string;
    characteristics: Array<{
        title: string;
        text: string;
    }>;
};

export interface RatingProps {
    theme?: Theme;
    rating: number;
}

export interface Auth {
    access_token: string;
    refresh_token: string;
}
