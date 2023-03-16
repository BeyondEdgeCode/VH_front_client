/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import css from './product-preview.module.css';
import cn from 'classnames';
import { Button } from '../ui-kit/button/button';
import { Product } from '../../type.store';
import { useState } from 'react';

interface ProductPreviewProps {
    product: Product;
}
type ProductAditionalImg = Pick<Product, 'other_images' | 'image_link'>;

const mapToSubImg = (imgs: ProductAditionalImg, onClick: (s: string) => void) =>
    imgs.other_images.length > 0 ? (
        [{ id: -1, link: imgs.image_link }, ...imgs.other_images].map((el) => {
            return (
                <Image
                    className={css.miniImg}
                    key={el.id}
                    src={el.link}
                    width={62}
                    height={76}
                    onClick={() => onClick(el.link)}
                />
            );
        })
    ) : (
        <Image
            className={css.miniImg}
            src={imgs.image_link}
            width={62}
            height={76}
        />
    );

export const ProductPreview = ({ product }: ProductPreviewProps) => {
    const [mainImgLink, setMainImgLink] = useState(product.image_link);
    return (
        <div className={css.wrapImg}>
            <div className={css.mainImg}>
                <img src={mainImgLink} className={css.mainImg_img} />
            </div>
            <div
                className={cn(css.wrapPrewiew, {
                    [css.wrapPrewiew_alone]: product.other_images.length === 0,
                })}
            >
                {mapToSubImg(product, setMainImgLink)}
            </div>
            <Button theme={[css.button]}>В корзину</Button>
        </div>
    );
};
