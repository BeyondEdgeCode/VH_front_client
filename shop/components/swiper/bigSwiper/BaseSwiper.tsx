// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import kat1 from '../../../public/img/kat1.jpg';
import kat2 from '../../../public/img/kat2.jpg';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import css from './baseSwiper.module.css';

const MOKE_IMGS_TO_SWIPER = [
    {
        ...kat1
    },
    {
        ...kat2
    },
    {
        ...kat1
    },
    {
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },{
        ...kat2
    },
    {
        ...kat1
    }
];


const SwiperButtonNext = (props: any) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slideNext()} className={css.swipper__next}>{props.children}</button>;
};

const SwiperButtonPrev = (props: any) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slidePrev()} className={css.swipper__prev}>{props.children}</button>;
};

export const BaseSwiper = () => {
  return (
    <section className={css.wrap}>
        <Swiper
            modules={[Pagination, Navigation, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop
            pagination={{ clickable: true,}}
            navigation
            // slidesPerGroup={4}
            autoplay
            className={css.swiper}
        >
        {MOKE_IMGS_TO_SWIPER.map(el => 
            <SwiperSlide>
                <img src={el.src} alt='kats' className={css.img}/>
            </SwiperSlide>
            )}
        {/* <div className={css.btn__wrap}>
            <SwiperButtonNext>next</SwiperButtonNext>
            <SwiperButtonPrev>Prev</SwiperButtonPrev>
        </div> */}
        </Swiper>
    </section>
  );
};