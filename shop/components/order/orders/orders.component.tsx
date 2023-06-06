/* eslint-disable @next/next/no-img-element */
import { memo, useMemo, useState } from 'react';
import { Orders } from '../../../type.store';
import { cancelOrder } from '../../../utilsFunctions/GetFromAPI';
import { useJWT_2 } from '../../../utilsFunctions/useHook';
import {
    getAdress,
    getAvalibleCancel,
    getOrderDeliveryType,
    getOrderStatus,
    getOrderStatusType,
} from './order.utils';

import css from './orders.module.css';
import cn from 'classnames';

interface OrdersProps {
    orders: Array<Orders>;
}

export const UserOrders = ({ orders }: OrdersProps) => {
    return (
        <div className={css.userOrdersWrap}>
            <h2 className={css.ordersTitle}>Мои заказы</h2>

            {orders.map((el) => (
                <OrderItems key={el.id} {...el} />
            ))}
        </div>
    );
};

interface OrderItemsProps extends Orders {}

interface StattusProps {
    status: string;
}

const Status = memo(function Status({ status }: StattusProps) {
    return <>{getOrderStatus(status)}</>;
});

const OrderItems = ({
    items,
    id,
    created_at,
    status,
    delivery_type,
    user,
    shop,
    sum,
}: OrderItemsProps) => {
    const statusType = getOrderStatusType(status);
    const jwt = useJWT_2();
    const [localStatus, setLocalStatus] = useState(status);

    return (
        <>
            <div className={css.orderItemsHeader}>
                <span>Заказ № {id} </span>
                <span className={css.orderLabelThin}>
                    от {new Date(created_at).toLocaleString()}
                </span>
            </div>
            <div className={css.orderItemsInfo}>
                <div>
                    <div className={css.orderItemsInfoGap}>
                        <span className={(css.orderLabelThin, css.greyFont)}>
                            Статус заказа:{' '}
                        </span>
                        <span
                            // :TODO после изменения API поменять на localStatus и проверить
                            className={cn(css.orderStatus, {
                                [css.sucessOrder]: statusType === 'sucess',
                                [css.progressOrder]: statusType === 'progress',
                                [css.errorOrder]: statusType === 'error',
                            })}
                        >
                            <Status status={localStatus} />
                        </span>
                    </div>
                    <div className={css.orderItemsInfoGap}>
                        <span className={(css.orderLabelThin, css.greyFont)}>
                            Способ получения:{' '}
                        </span>
                        <span>
                            {getOrderDeliveryType(delivery_type)},{' '}
                            {getAdress({ shop })}
                        </span>
                    </div>
                    <div className={css.orderItemsInfoGap}>
                        <span className={(css.orderLabelThin, css.greyFont)}>
                            Телефон получателя:{' '}
                        </span>
                        <span> {user.mobilephone}</span>
                    </div>
                </div>

                <div>
                    <div className={css.totalPriceWrap}>
                        <span className={css.totalPrice}>Итого:</span>
                        <span className={css.orderWrapPriceInfoSumWrapNum}>
                            {sum}
                        </span>
                    </div>
                    <div>
                        {getAvalibleCancel(status) && (
                            <button
                                className={css.cancelButton}
                                onClick={() => {
                                    jwt &&
                                        cancelOrder(jwt, id, () => {
                                            setLocalStatus('canceled_by_user');
                                        });
                                    setLocalStatus('canceled_by_user');
                                }}
                            >
                                Отменить
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={css.orderItemsWrap}>
                {items.map((el) => (
                    <Order key={el.product.id} item={el} />
                ))}
            </div>
        </>
    );
};

interface OrderProps {
    item: {
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
    };
}

const Order = ({ item }: OrderProps) => {
    return (
        <div className={css.orderWrap}>
            <img
                src={item.product.image_link}
                alt="Not Loading"
                className={css.orderImg}
            />

            <span className={css.orderTitle}>{item.product.title}</span>
            <div className={css.orderWrapPriceInfo}>
                <div className={css.orderWrapPriceInfoSumwrap}>
                    <span>Цена:</span>
                    <span className={css.orderWrapPriceInfoSumWrapNum}>
                        {item.item_sum} ₽
                    </span>
                </div>
                <span className={css.orderWrapPriceInfoPrice}>
                    {item.amount} шт. х {item.product.price} ₽
                </span>
            </div>
        </div>
    );
};
