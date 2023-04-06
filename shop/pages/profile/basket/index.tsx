import { useEffect, useState } from 'react';
import { Layout } from '../../../components/layout/layout';
import { Lading } from '../../../components/loading-spin/loading';
import { setNewCategoryState } from '../../../components/ui-kit/button/dropDown/category.store';
import { BasketData, FilterValues, HomeProps } from '../../../type.store';
import {
    getBasket,
    getCategory,
    getShops,
} from '../../../utilsFunctions/GetFromAPI';
import { useJWT_2 } from '../../../utilsFunctions/useHook';
import { BasketContainer } from './basket.container';
import css from './basket.module.css';

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

    return (
        <Layout mode={'horizontal'}>
            {basket ? (
                <BasketContainer
                    shops={shops}
                    jwt={jwt}
                    basket={basket}
                    isLoading={isLoading}
                />
            ) : (
                <div className={css.wrap_loader}>
                    <Lading />
                </div>
            )}
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
