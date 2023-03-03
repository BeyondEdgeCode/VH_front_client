import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperButtonNext, SwiperButtonPrev } from '../swiperKit/buttons';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ProductCard } from '../../ProductCard/productCard';
import { Product } from '../../../type.store';

import css from './mediumSwiper.module.css';

type MediumSwiperProps = {
    slides: Array<Product>;
    widthSlide: number;
    label?: string;
    isNew?: boolean;
    hasSale?: boolean;
};

export const MediumSwiper = ({
    slides,
    widthSlide,
    label,
    isNew = false,
    hasSale = false,
}: MediumSwiperProps) => {
    const sliderWrap = useRef<HTMLElement>(null);

    const [sliderWidth, setSliderWidth] = useState(0);
    const [slidesCount, setSlidesCount] = useState(5);

    useEffect(() => {
        sliderWrap.current && setSliderWidth(sliderWrap.current.offsetWidth);
    }, [sliderWrap]);

    useEffect(() => {
        if (Math.floor(sliderWidth / widthSlide) > 3) {
            setSlidesCount(Math.floor(sliderWidth / widthSlide) - 1);
        } else {
            setSlidesCount(Math.floor(sliderWidth / widthSlide));
        }
    }, [sliderWidth, widthSlide]);

    return (
        <section className={css.wrap} ref={sliderWrap}>
            {label ? <span className={css.label}>{label}</span> : null}
            <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                slidesPerView={slidesCount}
                navigation
                watchSlidesProgress={true}
                className={css.swiper}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <ProductCard
                            id={slide.id}
                            maxWidth={225}
                            height={400}
                            description={slide.title}
                            price={slide.price}
                            hasSale={hasSale}
                            isNew={isNew}
                            img={slide.image_link}
                            onClick={(): void => {
                                console.log(slide.image_link);
                            }}
                        />
                    </SwiperSlide>
                ))}
                <div className={css.btn__wrap}>
                    <SwiperButtonPrev />
                    <SwiperButtonNext />
                </div>
            </Swiper>
        </section>
    );
};
