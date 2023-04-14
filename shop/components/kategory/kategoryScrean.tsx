import { ReactNode, useEffect } from 'react';
import { isBasket } from '../../utilsFunctions/routerUtils';
import { v4 as uuidv4 } from 'uuid';

import css from './kategoryScrean.module.css';
import cn from 'classnames';
import { Lading } from '../loading-spin/loading';

type KategoryScreanProp = {
    cards: Array<ReactNode>;
    plug?: string;
    isLoading?: boolean;
    isAuth?: boolean;
    label?: string | null;
};

export const KategoryScrean = ({
    cards,
    plug = 'Ничего не найдено',
    isLoading = false,
    isAuth = false,
    label = null,
}: KategoryScreanProp) => {
    const isActiveBasket = isBasket();
    const isEmptyState = cards.length === 0;

    const UI = () => {
        if (isAuth) {
            return <span className={css.isEmpty}>Вы не автаризованны</span>;
        }
        if (isLoading) {
            return (
                <div className={css.loadingWrap}>
                    <Lading />
                </div>
            );
        }
        if (isEmptyState) {
            return <span className={css.isEmpty}>{plug}</span>;
        }
        return cards.map((el) => (
            <div
                key={uuidv4()}
                className={cn(css.el__wrap, {
                    [css.el__wrap_basket]: isActiveBasket,
                })}
            >
                {el}
            </div>
        ));
    };

    return (
        <div
            className={cn(css.wrap_kategory, {
                [css.wrap_kategory_basket]: isActiveBasket,
            })}
        >
            <span className={css.label}>{label}</span>
            {UI()}
        </div>
    );
};
