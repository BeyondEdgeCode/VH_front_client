import { isBasket } from '../../utilsFunctions/routerUtils';
import { useObservable } from '../../utilsFunctions/useHook';
import { notifications$, setNotifications } from '../notifications/notifications.view-model';
import css from './product-card.module.css';
import cn from 'classnames';
import { useState } from 'react';

type ProductCard = {
    maxWidth: number,
    height: number,
    description: string,
    price: number,
    count?: number,
    hasSale?: boolean,
    isNew?: boolean,
    img: string,
    onClick: () => void
}

export const ProductCard = (props: ProductCard) => {
    const {
        maxWidth,
        height,
        description,
        price,
        count,
        hasSale,
        isNew,
        img
    } = props;

    const [countToAdd, setCountToAdd] = useState(0);
    
    const notifications = useObservable<Array<string>>(notifications$) ?? [];
    const isActiveBasket = isBasket();
    const hasLabel = isNew || hasSale;
    const newStatus = hasLabel 
        ? (
        <div className={css.newProduct}>{isNew ? 'new': 'sale'}</div>
        ) 
        : null;
    
    const onClick = () => {
        setNotifications([...notifications, description])
    }
    const test = (e: number) => {
        if(e>0 && e-1 != -1) {
            return e - 1;
        } else {
            return e
        }
    }

    const basket = (
        <div className={css.wrap_basket}>
            {newStatus}
            <img src={img} alt='tovar' style={{width: 145, height: 185}} className={css.img}/>
            <div className={css.price_basket}>
                    {price} ₽
            </div>
            <p className={css.description_basket}>
                {description}
            </p>
            <div className={css.btnGroup}>
                <button className={cn(css.button, css.buttonCounter)} onClick={() => setCountToAdd(c => c+1)}>+</button>
                <span className={css.countToAdd}>{countToAdd}</span>
                <button className={cn(css.button, css.buttonCounter)} onClick={() => setCountToAdd(c => test(c))}>-</button>
            </div>
        </div>
    );
    const other = (
        <div style={{maxWidth, height}} className={css.wrap}>
            {newStatus}
            <img src={img} alt='tovar' style={{width: maxWidth-2}} className={css.img}/>
            <div 
                className={css.price}
                style={{
                    maxWidth: maxWidth/3,
                    left:maxWidth-(maxWidth/3) - 2
                }}>
                    {price} ₽
                </div>
                <p className={css.description}>
                    {description}
                </p>
                <button className={css.button} onClick={onClick}>В корзину</button>
        </div>
    );
    return (
        isActiveBasket ? basket : other
    );
}