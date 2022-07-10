import { useSwiper } from "swiper/react";
import css from './css/buttons.module.css';

export const SwiperButtonNext = (props: any) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slideNext()} className={css.swipper__next}>{props.children}</button>;
};

export const SwiperButtonPrev = (props: any) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slidePrev()} className={css.swipper__prev}>{props.children}</button>;
};


// export const SwiperPagination = (props: any) => {
//     const swiper = useSwiper();
//     for (let i = 0; i < swiper.pagination.bullets.length; i++) {
//         if(i>=3) {
//             swiper.pagination.bullets[i].remove();
//         }
//         if(swiper.pagination.bullets[i].classList.contains('pagination__active') && (i+1) % 3 == 1) {
//             console.log(i);
//             swiper.pagination.bullets[0].classList.add('pagination__active');
            
//         }
//     }
//     return <div className="swiper-pagination"></div>;
// };