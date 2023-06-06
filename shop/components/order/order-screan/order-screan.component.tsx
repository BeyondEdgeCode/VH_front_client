import { Orders } from '../../../type.store';
import { Lading } from '../../loading-spin/loading';
import { UserOrders } from '../orders/orders.component';
import css from './order-screan.module.css';

interface OrderScreanProps {
    jwt: string | null;
    isLoading: boolean;
    orders: Array<Orders>;
}
export const OrderScrean = ({ jwt, isLoading, orders }: OrderScreanProps) => {
    return (
        <>
            {!jwt ? (
                <span className={css.isEmpty}>Вы не автаризованны</span>
            ) : isLoading ? (
                <div className={css.isEmpty}>
                    <Lading />
                </div>
            ) : orders.length < 1 ? (
                <span className={css.isEmpty}>Ничего не найдено</span>
            ) : (
                <UserOrders orders={orders} />
            )}
        </>
    );
};
