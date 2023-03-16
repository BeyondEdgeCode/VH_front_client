import { ReactNode } from 'react';
import { isBasket } from '../../utilsFunctions/routerUtils';

import css from './kategoryScrean.module.css';
import cn from 'classnames';

type KategoryScreanProp = {
    cards: Array<ReactNode>;
    plug?: string;
};

export const KategoryScrean = ({
    cards,
    plug = 'Ничего не найдено',
}: KategoryScreanProp) => {
    const isActiveBasket = isBasket();
    const isEmptyState = cards.length === 0;

    return (
        <div className={css.wrap}>
            {isEmptyState ? (
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
