// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import kat1 from '../../../public/img/kat1.jpg';
import kat2 from '../../../public/img/kat2.jpg';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import css from './baseSwiper.module.css';
import { SwiperButtonNext, SwiperButtonPrev } from '../swiperKit/buttons';

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


export const BaseSwiper = () => {
  return (
    <section className={css.wrap}>
        <Swiper
            modules={
                [Pagination, Navigation, Scrollbar, A11y, Autoplay]
            }
            spaceBetween={50}
            slidesPerView={1}
            loop
            pagination={{ clickable: true, bulletActiveClass: 'pagination__active'}}
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