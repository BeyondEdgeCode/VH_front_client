import React, { memo } from 'react';
import { BasketAside } from '../../../components/basketAside/basketAside';
import { KategoryScrean } from '../../../components/kategory/kategoryScrean';
import { ProductCard } from '../../../components/ProductCard/productCard';
import { BasketData as InitBasketData } from '../../../type.store';
import { FilterValues } from '../../../type.store';
import { fromProperty, runVM } from '../../../utilsFunctions/useHook';
import { AvalibleProducts, BasketData, newBasketVM } from './basket.view-model';

import css from './basket.module.css';
import { StatemanjsComputedAPI } from '@persevie/statemanjs';

interface BasketContainerProps {
    shops: Array<FilterValues>;
    jwt: string | null;
    basket: InitBasketData;
    isLoading: boolean;
}

const mapBasketCards = (
    availableProducts: AvalibleProducts,
    inc?: (id: number, newCount: number) => void,
    dec?: (id: number, newCount: number) => void
) =>
    availableProducts
        ? availableProducts.map(({ product, amount }) => (
              <ProductCard
                  key={product.id}
                  maxWidth={89}
                  height={100}
                  description={product.title}
                  price={product.price}
                  img={product.image_link}
                  id={product.id}
                  count={amount}
                  isAvailible={true}
                  incCb={inc}
                  decCb={dec}
              />
          ))
        : [<></>];

const mapBasketCardsNotAvaileble = (availableProducts: AvalibleProducts) =>
    availableProducts
        ? availableProducts.map(({ product, amount }) => (
              <ProductCard
                  key={product.id}
                  maxWidth={89}
                  height={100}
                  description={product.title}
                  price={product.price}
                  img={product.image_link}
                  id={product.id}
                  count={amount}
                  isAvailible={false}
              />
          ))
        : [<></>];

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
}
// eslint-disable-next-line react/display-name
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
}: BasketComponent) => {
    return (
        <div className={css.wrap}>
            <KategoryScrean
                cards={mapBasketCards(
                    availableProducts,
                    incBasketTotal,
                    decBasketTotal
                ).concat(mapBasketCardsNotAvaileble(notAvailableProducts))}
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
            />
        </div>
    );
};
export const BasketContainer = memo(
    ({ shops, basket, jwt, isLoading }: BasketContainerProps) => {
        const vm = runVM<BasketData>(newBasketVM({ initShops: shops, basket }));
        const products = fromProperty(vm.availableProducts);
        const activeShopId = fromProperty(vm.activeShopId);
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
        });
    }
);
BasketContainer.displayName = 'BasketContainer';
