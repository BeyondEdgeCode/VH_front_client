import { ReactNode } from "react";
import { isBasket } from "../../utilsFunctions/routerUtils";

import css from './kategoryScrean.module.css';
import cn from 'classnames';

type KategoryScreanProp = {
    cards: Array<ReactNode>
};

export const KategoryScrean = ({cards}: KategoryScreanProp) => {
    const isActiveBasket = isBasket();

    return (
        <div className={css.wrap}>
            {cards.map(el => 
                <div className={cn(css.el__wrap, {[css.el__wrap_basket]: isActiveBasket})}>
                    {el}
                </div>
            )}
        </div>
    );
};