/* eslint-disable @next/next/no-img-element */
import { isBasket } from '../../utilsFunctions/routerUtils';
import { getLocalStorage } from '../../utilsFunctions/useHook';
import css from './product-card.module.css';
import { useCallback, useState } from 'react';
import { disableNegative, errorToast } from '../../utilsFunctions/utils';
import { Button } from '../ui-kit/button/button';
import { useRouter } from 'next/router';
import { RadioButton } from '../header/header';
import {
    addProductToFavorite,
    addToBasket,
} from '../../utilsFunctions/GetFromAPI';

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
        id,
    } = props;

    const [countToAdd, setCountToAdd] = useState(count ?? 0);

    const jwt = getLocalStorage('JWT');
    const addFavorits = () => {
        if (!jwt) {
            errorToast('Необходимо авторизоваться');
        } else {
            addProductToFavorite(id, jwt);
        }
    };

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

    const onClick = useCallback(() => {
        if (jwt) {
            addToBasket(id, jwt);
        } else {
            errorToast('Необходимо авторизоваться');
        }
    }, [id, jwt]);
    const other = (
        <div style={{ maxWidth, height }} className={css.wrap}>
            {newStatus}
            <img
                src={img}
                alt="tovar"
                style={{ width: maxWidth - 2 }}
                className={css.img}
                onClick={() => router.push(`/product/${id}`)}
            />
            <div className={css.heart_wrap} onClick={addFavorits}>
                <RadioButton theme={[css.heart]}>
                    <i className="fa-regular fa-heart fa-xl"></i>
                </RadioButton>
            </div>
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
