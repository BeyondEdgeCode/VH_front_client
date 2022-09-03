import img from "../../public/img/tovar1.jpg";
import Image from 'next/image';
import css from './product-preview.module.css';


export const ProductPreview = () => {
    return (
        <>
            <Image src={img} width={375} height={423} className={css.mainImg}/>
        </>
    );
}