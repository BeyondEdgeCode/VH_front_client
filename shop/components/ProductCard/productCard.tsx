import { isBasket } from '../../utilsFunctions/routerUtils';
import css from './product-card.module.css';

type ProductCard = {
    maxWidth: number,
    height: number,
    description: string,
    price: number,
    count?: number,
    hasSale: boolean,
    isNew: boolean,
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
    
    const isBasketRender = isBasket();
    const hasLabel = isNew || hasSale;
    const newStatus = hasLabel 
        ? (
        <div className={css.newProduct}>{isNew ? 'new': 'sale'}</div>
        ) 
        : null;
    return (
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
                <button className={css.button}>В корзину</button>
        </div>
    );
}