import { useEffect, useState } from 'react';
import { BasketAside } from '../../../components/basketAside/basketAside';
import { KategoryScrean } from '../../../components/kategory/kategoryScrean';
import { Layout } from '../../../components/layout/layout';
import { ProductCard } from '../../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../../components/ui-kit/button/dropDown/category.store';
import { BasketData, FilterValues, HomeProps } from '../../../type.store';
import {
    getBasket,
    getCategory,
    getShops,
} from '../../../utilsFunctions/GetFromAPI';
import { useJWT_2 } from '../../../utilsFunctions/useHook';

const mapBasketCards = (basket: BasketData | undefined) =>
    basket
        ? basket.products.map((product) => (
              <ProductCard
                  key={product.id}
                  maxWidth={188}
                  height={250}
                  description={product.product.title}
                  price={350}
                  img={product.product.image_link}
                  id={product.id}
                  count={product.amount}
              />
          ))
        : [<></>];

interface BasketProps extends HomeProps {
    shops: Array<FilterValues>;
}

const Basket = ({ category, shops }: BasketProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [basket, setBasket] = useState<BasketData>();
    const jwt = useJWT_2();

    setNewCategoryState(category);

    useEffect(() => {
        jwt &&
            getBasket(jwt).then((e) => {
                setBasket(e);
                setIsLoading(false);
            });
    }, [jwt, setIsLoading]);

    const newShop = shops
        .map(
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
        )
        .reduce((acc, val, idx) => {
            // @ts-ignore
            acc[`${idx}`] = val.address;
            return acc;
        }, {});
    console.log(newShop, shops);

    return (
        <Layout mode={'horizontal'}>
            <BasketAside total={basket?.total} shops={newShop} />
            <KategoryScrean
                cards={mapBasketCards(basket)}
                isLoading={isLoading}
            />
        </Layout>
    );
};

export async function getServerSideProps() {
    const category = await getCategory();
    const shops = await getShops();
    return {
        props: {
            category,
            shops,
        },
    };
}

export default Basket;
