import { ChangePersonForm } from './components/form/form.model';

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

export type ResponsePromo = {
    promocode: string;
    intersection_sum: number;
    intersection: Array<number>;
    type: 'fixed' | 'percent';
    value: number;
};

export interface Orders {
    id: number;
    user: ChangePersonForm;
    status:
        | 'awaiting_payment'
        | 'forming'
        | 'waiting_to_receive'
        | 'in_delivery'
        | 'finished'
        | 'canceled_by_system'
        | 'canceled_by_user';
    delivery_type: 'pickup' | 'delivery';
    payment_type: 'postpayment' | 'postpayment';
    sum: number;
    promocode_ref: string | null;
    shop: {
        street: string | null;
        title: string;
        description: string | null;
        id: number;
        building: string | null;
        city: string | null;
        preview: string | null;
    };
    items: [
        {
            item_sum: number;
            product: {
                id: number;
                title: string;
                description: string | null;
                price: number;
                image_link: string;
                avg_stars: number;
            };
            amount: number;
            price: number;
        }
    ];
    created_at: string;
}
