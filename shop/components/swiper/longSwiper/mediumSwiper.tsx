import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperButtonNext, SwiperButtonPrev } from '../swiperKit/buttons';


import css from './mediumSwiper.module.css';

export const MediumSwiper = () => {
    return (
        <section className={css.wrap}>
        <Swiper
            modules={
                [Pagination, Navigation, Scrollbar, A11y, Autoplay]
            }
            spaceBetween={50}
            slidesPerView={1}
            loop
            // pagination={{ 
            //     clickable: true,
            //     bulletActiveClass: 'pagination__active',
            // }}
            navigation
            className={css.swiper}
        >
            <SwiperSlide>
                <span>1</span>
            </SwiperSlide><SwiperSlide>
                <span>2</span>
            </SwiperSlide><SwiperSlide>
                <span>3</span>
            </SwiperSlide><SwiperSlide>
                <span>4</span>
            </SwiperSlide><SwiperSlide>
                <span>5</span>
            </SwiperSlide><SwiperSlide>
                <span>6</span>
            </SwiperSlide>
            <div className={css.btn__wrap}>
                <SwiperButtonPrev>Prev</SwiperButtonPrev>
                <SwiperButtonNext>next</SwiperButtonNext>
            </div>
        </Swiper>
    </section>
    );
  };