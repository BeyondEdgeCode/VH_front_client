import type { NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import { BaseSwiper } from '../components/swiper/bigSwiper/BaseSwiper';


const Home: NextPage = () => {
  return (
    <Layout>
      <BaseSwiper />
    </Layout>
  )
}

export default Home
