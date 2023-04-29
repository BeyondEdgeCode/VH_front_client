import {
    createComputedState,
    createState,
    StatemanjsAPI,
    StatemanjsComputedAPI,
} from '@persevie/statemanjs';
import { FilterValues, ResponsePromo } from '../../../type.store';
import { unknownVM } from '../../../utilsFunctions/useHook';
import { BasketData as InitBasketData } from '../../../type.store';
import {
    checkPromo,
    confirmOrder,
    deleteProductFromBusket,
} from '../../../utilsFunctions/GetFromAPI';
import { errorToast, isResponse } from '../../../utilsFunctions/utils';

interface newBasketVMProps {
    initShops: Array<FilterValues>;
    basket: InitBasketData;
    setBasketState: (s: InitBasketData) => void;
    initPromo: string;
    setInitPromo: (s: string) => void;
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
    setActivePaymentId: (id: number) => void;
    availableProducts: StatemanjsAPI<AvalibleProducts>;
    notAvailableProducts: StatemanjsAPI<AvalibleProducts>;
    activeShopId: StatemanjsAPI<number>;
    activePaymentId: StatemanjsAPI<number>;
    basketTotal: StatemanjsComputedAPI<number>;
    incBasketTotal: (id: number, newCount: number) => void;
    decBasketTotal: (id: number, newCount: number) => void;
    onDelete: (id: number) => void;
    promoOnChange: (promo: string) => void;
    applyPromo: () => void;
    promo: StatemanjsAPI<string>;
    comfirmOrder: () => void;
}

export const totalAfterPromo = createState<number | null>(null);
export const setTotalAfterPromo = (propmo: number | null) =>
    totalAfterPromo.set(propmo);

export const responsePromo = createState<ResponsePromo | null>(null);
export const setResponsePromo = (data: ResponsePromo | null) =>
    responsePromo.set(data);

export const newBasketVM = ({
    initShops,
    basket,
    setBasketState,
    initPromo,
    setInitPromo,
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
    const activePaymentId = createState(0);
    const promo = createState<string>(initPromo);

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

    const setActivePaymentId = (id: number) => {
        activePaymentId.set(id);
    };

    const incBasketTotal = (id: number, newCount: number) => {
        const t = availableProducts.unwrap();
        const t2 = t.map((el) =>
            el.product.id === id ? { ...el, amount: newCount } : el
        );
        const t3 = notAvailableProducts.unwrap();
        setBasketState({
            ...basket,
            products: [...t2, ...t3],
        });

        availableProducts.set(t2);
        setTotalAfterPromo(null);
        setResponsePromo(null);
    };

    const decBasketTotal = (id: number, newCount: number) => {
        const t = availableProducts.unwrap();
        const t2 = t
            .map((el) =>
                el.product.id === id ? { ...el, amount: newCount } : el
            )
            .filter((el) => el.amount !== 0);
        const t3 = notAvailableProducts.unwrap();
        setBasketState({
            ...basket,
            products: [...t2, ...t3],
        });

        availableProducts.set(t2);
        setTotalAfterPromo(null);
        setResponsePromo(null);
    };

    const jwt = localStorage.getItem('JWT');
    const onDelete = (id: number) => {
        if (jwt) {
            deleteProductFromBusket(id, jwt);
            setBasketState({
                ...basket,
                products: basket.products.filter((el) => el.product.id !== id),
            });

            const available = availableProducts
                .unwrap()
                .filter((el) => el.product.id !== id);
            const notAvailable = notAvailableProducts
                .unwrap()
                .filter((el) => el.product.id !== id);
            availableProducts.set(available);
            notAvailableProducts.set(notAvailable);
            totalAfterPromo.set(null);
            setResponsePromo(null);
        }
    };

    const promoOnChange = (promoChange: string) => {
        promo.set(promoChange);
        setInitPromo(promoChange);
    };

    const applyPromo = async () => {
        if (jwt) {
            const promoResponce = await checkPromo(promo.unwrap(), jwt);
            if (isResponse(promoResponce) && promoResponce.status !== 200) {
                errorToast(promoResponce.msg);
            } else if (promoResponce && !isResponse(promoResponce)) {
                setResponsePromo(promoResponce);
                switch (promoResponce.type) {
                    case 'fixed':
                        const curBasketTotal = basketTotal.unwrap();
                        setTotalAfterPromo(
                            curBasketTotal - promoResponce.value
                        );

                        break;
                    case 'percent':
                        const curAvalibleProduct = availableProducts.unwrap();
                        const percentOfScelle =
                            (100 - promoResponce.value) / 100;
                        const productWithScell = promoResponce.intersection;

                        const newTotal = curAvalibleProduct.reduce(
                            (prev, cur) => {
                                if (productWithScell.includes(cur.product.id)) {
                                    return (
                                        prev +
                                        cur.product.price *
                                            cur.amount *
                                            percentOfScelle
                                    );
                                } else {
                                    return (
                                        prev + cur.product.price * cur.amount
                                    );
                                }
                            },
                            0
                        );
                        setTotalAfterPromo(newTotal);

                    default:
                        break;
                }
            }
        }
    };

    const basketTotal = createComputedState(() => {
        const t = availableProducts.get();
        const t2 = t.reduce(
            (prev, cur) => prev + cur.product.price * cur.amount,
            0
        );
        return t2;
    }, [availableProducts]);

    const comfirmOrder = () => {
        const shop_id = Number(newShop[activeShopId.get()].id);
        const promocode = responsePromo.get()?.promocode;

        if (jwt) {
            confirmOrder({ shop_id, promocode }, jwt);
            setBasketState({ availability: [], products: [], total: 0 });
            availableProducts.set(null);
        }
    };

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
            basketTotal,
            incBasketTotal,
            decBasketTotal,
            onDelete,
            activePaymentId,
            setActivePaymentId,
            promoOnChange,
            applyPromo,
            promo,
            comfirmOrder,
        },
        observers: {},
    };
};
