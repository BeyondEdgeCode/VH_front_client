import {
    createComputedState,
    createState,
    StatemanjsAPI,
    StatemanjsComputedAPI,
} from '@persevie/statemanjs';
import { FilterValues } from '../../../type.store';
import { unknownVM } from '../../../utilsFunctions/useHook';
import { BasketData as InitBasketData } from '../../../type.store';

interface newBasketVMProps {
    initShops: Array<FilterValues>;
    basket: InitBasketData;
}

export type AvalibleProducts = Array<{
    product: {
        avg_stars: number;
        id: number;
        price: number;
        title: string;
        image_link: string;
    };
    amount: number;
}>;

export interface BasketData {
    shopAdress: FilterValues;
    setActiveShopId: (id: number) => void;
    availableProducts: StatemanjsAPI<AvalibleProducts>;
    notAvailableProducts: StatemanjsAPI<AvalibleProducts>;
    activeShopId: StatemanjsAPI<number>;
    basketTotal: StatemanjsComputedAPI<number>;
    incBasketTotal: (id: number, newCount: number) => void;
    decBasketTotal: (id: number, newCount: number) => void;
}

export const newBasketVM = ({
    initShops,
    basket,
}: newBasketVMProps): unknownVM<BasketData> => {
    const newShop = initShops.map(
        (el) =>
            (el = {
                description: el.description,
                preview: el.preview,
                id: el.id,
                title: el.title,
                address: el.city
                    ? `${el.city} ${el.street} ${el.building}`
                    : el.title,
            })
    );

    const newShopState = createState(newShop);
    const initProducts = createState(basket.products);
    const availableProducts = createState(
        basket.products
            .sort((a, b) => a.product.id - b.product.id)
            .filter(
                (el) =>
                    !basket.availability[0].not_available.includes(
                        el.product.id
                    )
            )
    );
    const notAvailableProducts = createState<AvalibleProducts>([]);
    const activeShopId = createState(0);

    const setActiveShopId = (id: number) => {
        activeShopId.set(id);
        const curShop = basket.availability.find((el) => el.shop_id === id + 1);

        const avalible = initProducts
            .get()
            .filter((x) => !curShop?.not_available.includes(x.product.id));

        const notAvalible = initProducts
            .get()
            .filter((x) => curShop?.not_available.includes(x.product.id));

        availableProducts.set(
            avalible.sort((a, b) => a.product.id - b.product.id)
        );
        notAvailableProducts.set(
            notAvalible.sort((a, b) => a.product.id - b.product.id)
        );
    };

    const incBasketTotal = (id: number, newCount: number) => {
        const t = availableProducts.unwrap();
        const t2 = t.map((el) =>
            el.product.id === id ? { ...el, amount: newCount } : el
        );

        availableProducts.set(t2);
    };

    const decBasketTotal = (id: number, newCount: number) => {
        const t = availableProducts.unwrap();
        const t2 = t.map((el) =>
            el.product.id === id ? { ...el, amount: newCount } : el
        );
        availableProducts.set(t2);
    };

    const test = createComputedState(() => {
        const t = availableProducts.get();
        const t2 = t.reduce(
            (prev, cur) => prev + cur.product.price * cur.amount,
            0
        );
        return t2;
    }, [availableProducts]);

    return {
        values: {
            shopAdress: newShopState.get().reduce((acc, val, idx) => {
                // @ts-ignore
                acc[`${idx}`] = val.address;
                return acc;
            }, {}),
            availableProducts,
            notAvailableProducts,
            setActiveShopId,
            activeShopId,
            // basketTotal,
            basketTotal: test,
            incBasketTotal,
            decBasketTotal,
        },
        observers: {},
    };
};
