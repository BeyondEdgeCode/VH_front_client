import type { NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import { ProductCard } from '../components/ProductCard/productCard';
import { BaseSwiper } from '../components/swiper/bigSwiper/BaseSwiper';
import { MediumSwiper } from '../components/swiper/longSwiper/mediumSwiper';
import img from '../public/img/tovar1.jpg';


const Home: NextPage = () => {
  return (
    <Layout>
      <BaseSwiper />

      <MediumSwiper />

      <ProductCard 
        maxWidth={225}
        height={400}
        description={'Rell Strawberry Watermelon bla bla 30ml'}
        price={350}
        hasSale={true}
        isNew={false}
        img={img.src} onClick={(): void  => {console.log(img.src)}}
        />

      <ProductCard 
        maxWidth={225}
        height={400}
        description={'Rell Strawberry Watermelon bla bla 30ml'}
        price={350}
        hasSale={false}
        isNew={true}
        img={img.src} onClick={(): void  => {console.log(img.src)}}
      />
    </Layout>
  )
}

export default Home
