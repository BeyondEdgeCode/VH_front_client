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
    price: number;
    other_images: Array<{
        id: number;
        link: string;
    }>;
    image_link: string;
    avg_stars: number;
    title: string;
    specifications: Array<{
        key: string;
        value: string;
    }>;
    id: number;
    available: Array<{
        amount: number;
        shop: {
            id: number;
            title: string;
        };
    }>;
    description: string;
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

export interface RatingProps {
    theme?: Theme;
    rating: number;
}

export interface Auth {
    access_token: string;
    refresh_token: string;
}

export interface Reviews {
    product_id: number;
    stars: number;
    text: string;
    created_at: string;
    id: number;
    user: {
        firstName: string | null;
    };
}

export interface BasketData {
    availability: Array<{
        not_available: Array<number>;
        shop_id: number;
    }>;
    products: Array<{
        product: {
            avg_stars: number;
            id: number;
            price: number;
            title: string;
            image_link: string;
        };
        amount: number;
    }>;
    total: number;
}
