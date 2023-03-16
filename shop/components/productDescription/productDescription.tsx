import { Product } from '../../type.store';
import { Rating } from '../rating/rating';
import css from './productDescription.module.css';

const CharacteristicsPiece = ({
    specifications,
}: Pick<Product, 'specifications'>) => {
    return (
        <>
            {specifications.map((c) => (
                <div className={css.characteristics__piece} key={c.key}>
                    <span className={css.characteristics__title}>{c.key}</span>
                    <div className={css.characteristics__dots}></div>
                    <span>{c.value}</span>
                </div>
            ))}
        </>
    );
};

interface ProductDescriptionProps {
    product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.descriptiponWrap}>
                <h3 className="mb_2">
                    Описание
                    <Rating rating={product.avg_stars} theme={['ml-2']} />
                </h3>
                <p>{product.description}</p>
            </div>
            <h3 className={'mb_2'}>Характеристики</h3>
            <div className={css.characteristics}>
                <CharacteristicsPiece specifications={product.specifications} />
            </div>
        </div>
    );
};
