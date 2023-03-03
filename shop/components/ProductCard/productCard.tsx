import { isBasket } from '../../utilsFunctions/routerUtils';
import { useObservable } from '../../utilsFunctions/useHook';
import {
    notifications$,
    setNotifications,
} from '../notifications/notifications.view-model';
import css from './product-card.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { disableNegative } from '../../utilsFunctions/utils';
import { Button } from '../ui-kit/button/button';
import { useRouter } from 'next/router';

type ProductCard = {
    id: number;
    maxWidth: number;
    height: number;
    description: string;
    price: number;
    count?: number;
    hasSale?: boolean;
    isNew?: boolean;
    img: string;
    onClick: () => void;
};

export const ProductCard = (props: ProductCard) => {
    const {
        maxWidth,
        height,
        description,
        price,
        count,
        hasSale,
        isNew,
        img,
        onClick,
        id,
    } = props;

    const [countToAdd, setCountToAdd] = useState(0);

    const notifications = useObservable<Array<string>>(notifications$) ?? [];
    const isActiveBasket = isBasket();
    const hasLabel = isNew || hasSale;
    const newStatus = hasLabel ? (
        <div className={css.newProduct}>{isNew ? 'new' : 'sale'}</div>
    ) : null;

    const router = useRouter();

    const basket = (
        <div className={css.wrap_basket}>
            {newStatus}
            <img
                src={img}
                alt="tovar"
                style={{ width: 145, height: 185 }}
                className={css.img}
            />
            <div className={css.price_basket}>{price} ₽</div>
            <p className={css.description_basket}>{description}</p>
            <div className={css.btnGroup}>
                <Button isSmall onClick={() => setCountToAdd((c) => c + 1)}>
                    +
                </Button>
                <span className={css.countToAdd}>{countToAdd}</span>
                <Button
                    isSmall
                    onClick={() => setCountToAdd((c) => disableNegative(c))}
                >
                    -
                </Button>
            </div>
        </div>
    );
    const other = (
        <div
            style={{ maxWidth, height }}
            className={css.wrap}
            onClick={() => router.push(`/product/${id}`)}
        >
            {newStatus}
            <img
                src={img}
                alt="tovar"
                style={{ width: maxWidth - 2 }}
                className={css.img}
            />
            <div
                className={css.price}
                style={{
                    maxWidth: maxWidth / 3,
                    left: maxWidth - maxWidth / 3 - 2,
                }}
            >
                {price} ₽
            </div>
            <p className={css.description}>{description}</p>
            <Button onClick={onClick}>В корзину</Button>
        </div>
    );

    return isActiveBasket ? basket : other;
};
