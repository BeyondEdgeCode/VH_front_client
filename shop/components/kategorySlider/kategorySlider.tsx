import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import css from './kategorySlider.module.css';

type KategorySliderProp = {
    slides: Array<ReactNode>
}

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const KategorySlider = ({slides}: KategorySliderProp) => {
    return (
        <Swiper
            modules={
                [Pagination, Navigation, Scrollbar, A11y, Autoplay]
            }
            slidesPerView={1}
            navigation
            className={css.swiper}
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    {slide}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}