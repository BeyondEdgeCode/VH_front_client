import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperButtonNext, SwiperButtonPrev } from '../swiperKit/buttons';
import { ReactNode, useEffect, useRef, useState } from 'react';


import css from './mediumSwiper.module.css';

type MediumSwiperProps = {
    slides: Array<ReactNode>,
    widthSlide: number,
    label?: string,
}

export const MediumSwiper = ({slides, widthSlide, label}: MediumSwiperProps) => {
    const sliderWrap = useRef<HTMLElement>(null);

    const [sliderWidth, setSliderWidth] = useState(0);
    const [slidesCount, setSlidesCount] = useState(5);

    useEffect(() => {
        sliderWrap.current && setSliderWidth(sliderWrap.current.offsetWidth);
    },[sliderWrap]);

    useEffect(() => {
        if (Math.floor(sliderWidth / widthSlide)>3) {
            setSlidesCount(Math.floor(sliderWidth / widthSlide)-1);
        } else {
            setSlidesCount(Math.floor(sliderWidth / widthSlide));
        }
    }, [sliderWidth, widthSlide])

    return (
        <section className={css.wrap} ref={sliderWrap}>
        {label ? <span className={css.label}>{label}</span> : null}
        <Swiper
            modules={
                [Pagination, Navigation, Scrollbar, A11y, Autoplay]
            }
            // spaceBetween={30}
            slidesPerView={slidesCount}
            // loop
            navigation
            className={css.swiper}
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    {slide}
                </SwiperSlide>
            ))}
            <div className={css.btn__wrap}>
                <SwiperButtonPrev>Prev</SwiperButtonPrev>
                <SwiperButtonNext>next</SwiperButtonNext>
            </div>
        </Swiper>
    </section>
    );
  };