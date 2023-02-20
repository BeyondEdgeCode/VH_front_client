import { Layout } from '../components/layout/layout'
import { BaseSwiper } from '../components/swiper/bigSwiper/BaseSwiper'
import { MediumSwiper } from '../components/swiper/longSwiper/mediumSwiper'
import {
    getCategory,
    getLatestProduct,
    getMainSwiper,
} from '../utilsFunctions/GetFromAPI'
import { setNewCategoryState } from '../components/ui-kit/button/dropDown/category.store'
import { BaseSwiperProp, HomeProps, Product } from '../type.store'

const Home = ({
    category,
    imgs,
    latestProduct,
}: HomeProps &
    BaseSwiperProp & {
        latestProduct: Array<Product>
    }) => {
    setNewCategoryState(category)

    return (
        <Layout mode={'vertical'}>
            <BaseSwiper imgs={imgs} />

            <MediumSwiper
                slides={latestProduct}
                widthSlide={225}
                label={'Скидки'}
                hasSale
            />
            <MediumSwiper
                slides={latestProduct}
                widthSlide={225}
                label={'Новинки'}
                isNew
            />
        </Layout>
    )
}

export async function getStaticProps() {
    const category = await getCategory()
    const imgs = await getMainSwiper()
    const latestProduct = await getLatestProduct()
    return {
        props: {
            category,
            imgs,
            latestProduct,
        },
    }
}

export default Home
