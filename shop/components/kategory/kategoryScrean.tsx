import { ReactNode } from "react";

import css from './kategoryScrean.module.css';


type KategoryScreanProp = {
    cards: Array<ReactNode>
};

export const KategoryScrean = ({cards}: KategoryScreanProp) => {
    return (
        <div className={css.wrap}>
            {cards.map(el => 
                <div className={css.el_wrap}>
                    {el}
                </div>
            )}
        </div>
    );
};