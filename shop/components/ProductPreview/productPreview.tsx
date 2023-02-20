// import img from "../../public/img/tovar1.jpg";
import Image from 'next/image'
import css from './product-preview.module.css'
import cn from 'classnames'
import { Button } from '../ui-kit/button/button'

export const ProductPreview = () => {
    return (
        <div className={css.wrapImg}>
            {/* <div className={css.mainImg}>
                <Image src={img} width={375} height={423} />
            </div>
            <div className={css.wrapPrewiew}>
                <div className={cn(css.miniImg, {[css.miniImg_isActive]: true})}>
                    <Image src={img} width={62} height={70} />
                </div>
                <div className={css.miniImg}>
                    <Image src={img} width={62} height={70} />
                </div>
                <div className={css.miniImg}>
                    <Image src={img} width={62} height={70} />
                </div>
                <div className={css.miniImg}>
                    <Image src={img} width={62} height={70} />
                </div>
            </div> */}
            <Button theme={[css.button]}>В корзину</Button>
        </div>
    )
}
