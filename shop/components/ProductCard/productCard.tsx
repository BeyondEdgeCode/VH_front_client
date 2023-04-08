/* eslint-disable @next/next/no-img-element */
import { isBasket } from '../../utilsFunctions/routerUtils';
import { getLocalStorage } from '../../utilsFunctions/useHook';
import css from './product-card.module.css';
import { useCallback, useEffect, useState } from 'react';
import {
    disableNegative,
    errorToast,
    successToast,
} from '../../utilsFunctions/utils';
import { Button } from '../ui-kit/button/button';
import { useRouter } from 'next/router';
import { RadioButton } from '../header/header';
import {
    addProductToFavorite,
    addToBasket,
    decBasket,
    incBasket,
} from '../../utilsFunctions/GetFromAPI';
import cn from 'classnames';

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
    isAvailible?: boolean;
    incCb?: (id: number, newCount: number) => void;
    decCb?: (id: number, newCount: number) => void;
    onDelete?: (id: number) => void;
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
        isAvailible,
        incCb,
        decCb,
        onDelete,
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

    const incProduct = () => {
        jwt &&
            incBasket(id, jwt, () => {
                setCountToAdd((c) => c + 1);
                if (incCb) {
                    incCb(id, countToAdd + 1);
                }
            });
    };

    const decProduct = () => {
        jwt &&
            decBasket(id, jwt, () => {
                setCountToAdd((c) => disableNegative(c));
                if (decCb) {
                    decCb(id, countToAdd - 1);
                }
            });
    };

    const onClick = useCallback(() => {
        if (jwt) {
            addToBasket(id, jwt);
        } else {
            errorToast('Необходимо авторизоваться');
        }
    }, [id, jwt]);

    const basket = (
        <div className={css.wrap_basket}>
            {newStatus}
            <div
                style={{
                    maxWidth: maxWidth,
                }}
                className={css.img_basket_wrap}
            >
                <img
                    src={img}
                    alt="tovar"
                    style={{
                        maxWidth: maxWidth,
                        height,
                    }}
                    className={cn(css.img, {
                        [css.img_notAvailible]: !isAvailible,
                        [css.img_basket]: true,
                    })}
                />
                <span
                    className={css.delete_label}
                    onClick={() => onDelete && onDelete(id)}
                >
                    Удалить
                </span>
            </div>
            <div className={css.description_basket_wrap}>
                <p className={css.description_basket}>{description}</p>
                {!isAvailible && (
                    <p className={css.description_basket_notAvailible}>
                        Товар недоступен в магазине
                    </p>
                )}
            </div>
            <span className={css.total_product}>{countToAdd * price} руб</span>
            <div className={css.wrap_control}>
                <div className={css.btnGroup}>
                    <button
                        className={css.btn_control}
                        onClick={() => incProduct()}
                    >
                        +
                    </button>
                    {/* <span className={css.countToAdd}>{count}</span> */}
                    <span className={css.countToAdd}>{countToAdd}</span>
                    <button
                        className={css.btn_control}
                        onClick={() => decProduct()}
                    >
                        -
                    </button>
                </div>
                <div className={css.price_basket}>{price} ₽ / шт</div>
            </div>
        </div>
    );

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
