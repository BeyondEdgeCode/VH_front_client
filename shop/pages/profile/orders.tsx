import { useEffect, useState } from 'react';
import { LoyoutProfile } from '../../components/layout/loyoutProfile';
import { OrderScrean } from '../../components/order/order-screan/order-screan.component';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import { HomeProps, Orders } from '../../type.store';
import { getCategory, getOrder } from '../../utilsFunctions/GetFromAPI';
import { useJWT_2 } from '../../utilsFunctions/useHook';

interface MyOrdersProps extends HomeProps {}

const MyOrders = ({ category }: MyOrdersProps) => {
    setNewCategoryState(category);
    const jwt = useJWT_2();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Array<Orders>>([]);

    useEffect(() => {
        jwt &&
            getOrder(jwt).then((e) => {
                setOrders(e);
                setIsLoading(false);
            });
    }, [jwt, setIsLoading]);

    return (
        <LoyoutProfile>
            <OrderScrean jwt={jwt} isLoading={isLoading} orders={orders} />
        </LoyoutProfile>
    );
};

export async function getStaticProps() {
    const category = await getCategory();
    return {
        props: {
            category,
        },
    };
}

export default MyOrders;
