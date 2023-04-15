import React, { memo } from 'react';
import { BasketAside } from '../../../components/basketAside/basketAside';
import { KategoryScrean } from '../../../components/kategory/kategoryScrean';
import { BasketData as InitBasketData } from '../../../type.store';
import { FilterValues } from '../../../type.store';
import { fromProperty, runVM } from '../../../utilsFunctions/useHook';
import { AvalibleProducts, BasketData, newBasketVM } from './basket.view-model';
import { StatemanjsAPI, StatemanjsComputedAPI } from '@persevie/statemanjs';
import { mapBasketCards, mapBasketCardsNotAvaileble } from './basket.utils';

import css from './basket.module.css';

interface BasketComponent {
    isLoading: boolean;
    isAuth: boolean;
    availableProducts: AvalibleProducts;
    notAvailableProducts: AvalibleProducts;
    total: StatemanjsComputedAPI<number>;
    shops: FilterValues;
    setActiveShopId: (id: number) => void;
    activeId: number;
    incBasketTotal: (id: number, newCount: number) => void;
    decBasketTotal: (id: number, newCount: number) => void;
    onDelete: (id: number) => void;
    activePaymentId: number;
    setActivePaymentId: (id: number) => void;
    promoOnChange: (promo: string) => void;
    applyPromo: () => void;
    totalAfterPromo: StatemanjsAPI<number | null>;
}

const BasketComponent = ({
    isLoading,
    isAuth,
    availableProducts,
    notAvailableProducts,
    total,
    shops,
    setActiveShopId,
    activeId,
    incBasketTotal,
    decBasketTotal,
    onDelete,
    activePaymentId,
    setActivePaymentId,
    promoOnChange,
    applyPromo,
    totalAfterPromo,
}: BasketComponent) => {
    return (
        <div className={css.wrap}>
            <KategoryScrean
                cards={mapBasketCards(
                    availableProducts,
                    incBasketTotal,
                    decBasketTotal,
                    onDelete
                ).concat(
                    mapBasketCardsNotAvaileble(notAvailableProducts, onDelete)
                )}
                isLoading={isLoading}
                isAuth={!isAuth}
                label={'Корзина'}
            />
            <BasketAside
                total={total}
                isAuth={isAuth}
                shops={shops}
                setActiveShopId={setActiveShopId}
                activeId={activeId}
                activePaymentId={activePaymentId}
                setActivePaymentId={setActivePaymentId}
                promoOnChange={promoOnChange}
                applyPromo={applyPromo}
                totalAfterPromo={totalAfterPromo}
            />
        </div>
    );
};

interface BasketContainerProps {
    shops: Array<FilterValues>;
    jwt: string | null;
    basket: InitBasketData;
    isLoading: boolean;
    setBasketState: (s: InitBasketData) => void;
}

export const BasketContainer = memo(
    ({
        shops,
        basket,
        jwt,
        isLoading,
        setBasketState,
    }: BasketContainerProps) => {
        const vm = runVM<BasketData>(
            newBasketVM({ initShops: shops, basket, setBasketState })
        );
        const products = fromProperty(vm.availableProducts);
        const activeShopId = fromProperty(vm.activeShopId);
        const activePaymentId = fromProperty(vm.activePaymentId);
        const notAvailableProducts = fromProperty(vm.notAvailableProducts);

        return React.createElement(BasketComponent, {
            isLoading: isLoading,
            isAuth: !!jwt,
            availableProducts: products,
            total: vm.basketTotal,
            shops: vm.shopAdress,
            setActiveShopId: vm.setActiveShopId,
            activeId: activeShopId,
            notAvailableProducts,
            incBasketTotal: (id: number, newCount: number) =>
                vm.incBasketTotal(id, newCount),
            decBasketTotal: (id: number, newCount: number) =>
                vm.decBasketTotal(id, newCount),
            onDelete: vm.onDelete,
            activePaymentId,
            setActivePaymentId: vm.setActivePaymentId,
            promoOnChange: vm.promoOnChange,
            applyPromo: vm.applyPromo,
            totalAfterPromo: vm.totalAfterPromo,
        });
    }
);
BasketContainer.displayName = 'BasketContainer';
