import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { BaseSwiperProp } from '../../../type.store'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import css from './baseSwiper.module.css'

export const BaseSwiper = ({ imgs }: BaseSwiperProp) => {
    return (
        <section className={css.wrap}>
            <Swiper
                modules={[Pagination, Navigation, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                loop
                pagination={{
                    clickable: true,
                    bulletActiveClass: 'pagination__active',
                }}
                navigation
                autoplay
                className={css.swiper}
            >
                {imgs.map((el) => (
                    <SwiperSlide key={el.image_id}>
                        {/* TODO CHENGE to IMG from Next */}
                        <img
                            src={el.image_link}
                            alt="kats"
                            className={css.img}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
