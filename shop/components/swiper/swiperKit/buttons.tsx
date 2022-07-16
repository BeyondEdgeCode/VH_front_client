import { useSwiper } from "swiper/react";
import { Arrow } from "../../svg/arrow";
import css from './css/buttons.module.css';

export const SwiperButtonNext = (props: any) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slideNext()} className={css.swipper__next}>
        <Arrow />
    </button>;
};

export const SwiperButtonPrev = () => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slidePrev()} className={css.swipper__prev}>
        <Arrow />
    </button>;
};