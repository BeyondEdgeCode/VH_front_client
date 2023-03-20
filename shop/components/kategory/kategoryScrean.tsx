import { ReactNode } from 'react';
import { isBasket } from '../../utilsFunctions/routerUtils';

import css from './kategoryScrean.module.css';
import cn from 'classnames';
import { Lading } from '../loading-spin/loading';

type KategoryScreanProp = {
    cards: Array<ReactNode>;
    plug?: string;
    isLoading?: boolean;
};

export const KategoryScrean = ({
    cards,
    plug = 'Ничего не найдено',
    isLoading = false,
}: KategoryScreanProp) => {
    const isActiveBasket = isBasket();
    const isEmptyState = cards.length === 0;

    return (
        <div className={css.wrap}>
            {isLoading ? (
                <Lading />
            ) : isEmptyState ? (
                <span className={css.isEmpty}>{plug}</span>
            ) : (
                cards.map((el) => (
                    <div
                        key={el?.toString()}
                        className={cn(css.el__wrap, {
                            [css.el__wrap_basket]: isActiveBasket,
                        })}
                    >
                        {el}
                    </div>
                ))
            )}
        </div>
    );
};
